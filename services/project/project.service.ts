import { jira } from '../../config';
import { EProjectStatus } from '../../constants/project';
import sequelizeConnection from '../../db/config';
import { CreateProjectDTO, IProjectFilters, UpdateProjectDTO } from '../../db/dto/project.dto';
import Project from '../../db/models/project';
import Task from '../../db/models/task';
import Timer from '../../db/models/timer';
import User from '../../db/models/user';
import { HttpError } from '../../types/error';
import { checkIfCanAddWithoutRestrictions, compareProjects } from '../../utils/jira';
import { checkStatus, hasAccessToProject, isUserAlreadyAdded } from '../../utils/projects';
import { calculateAverageTimeSpentOnProject, calculateAverageTimeSpentOnProjectByUser, calculateLongestTasksOnProject, calculateTimeSpentOnProject } from '../../utils/timer';
import { hasAccessToAllProjects } from '../../utils/user';
import { getAllBoards, getIssues } from '../integrations/jira/jira.service';
import { synchronizeTasks } from '../task/task.service';

export const create = async (userId: number, payload: CreateProjectDTO) => {
  if (!payload.name || !userId) {
    throw new HttpError('BadRequest', 'Provide required info');
  }

  const projectName = payload.name.toLowerCase();

  const project = await Project.findOne({
    where: sequelizeConnection.where(sequelizeConnection.fn('lower', sequelizeConnection.col('name')), projectName),
  });

  if (project) {
    throw new HttpError('BadRequest', 'Project already exists');
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw new HttpError('BadRequest', 'Could not find user');
  }

  try {
    const project = await Project.create(payload);
    return await Project.findByPk(project.id, {
      include: [{ model: User, as: 'users', attributes: ['id'] }, { model: Task }],
    });
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const remove = async (projectId: number) => {
  if (!projectId) {
    throw new HttpError('BadRequest', 'ProjectId was not provided');
  }

  let project;

  try {
    project = await Project.findByPk(projectId);
  } catch (error) {
    throw new HttpError('ServerError');
  }

  if (!project) {
    throw new HttpError('NotFound', 'Project with id was not found');
  }

  try {
    await project.destroy();
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const synchronizeProjects = async (user: User) => {
  const boards = await getAllBoards();
  boards.values.forEach(async (board) => {
    const {
      location: { projectId, projectName },
    } = board;
    const project = await Project.findByPk(projectId);
    if (project) {
      await compareProjects(board, project, user);
      await synchronizeTasks(String(board.id));
      return;
    }
    await Project.create({ id: projectId, name: projectName, budget: 0, isJiraProject: true });
    const newProject = await Project.findByPk(projectId);
    if (newProject && checkIfCanAddWithoutRestrictions(user)) {
      newProject.addUsers(user);
    }
    await synchronizeTasks(String(board.id));
  });
};

export const getAll = async (userId: number, filters: IProjectFilters) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return;
    }
    await synchronizeProjects(user);
    const allProjects = await Project.findAll({
      include: [
        { model: User, as: 'users', attributes: ['id'] },
        { model: Task, include: [{ model: Timer }] },
      ],
    });
    // filter projects where user is already added
    const filteredProjects = allProjects.filter((project) => {
      return hasAccessToProject(user, project);
    });

    // filter projects by status
    let projects = filteredProjects;
    if (filters.access) {
      if (filters.access === 'All') {
      } else if (filters.access === 'Public') {
        projects = projects.filter((project) => {
          return project.isPublic
        });
      } else if (filters.access === 'Private') {
        projects = projects.filter((project) => {
          return !project.isPublic
        });
      }
    }

    if (filters.status) {
      if (filters.status === 'All') {
      } else if (filters.status === 'Active') {
        projects = projects.filter((project) => {
          return !project.isArchived;
        });
      } else if (filters.status === 'Archived') {
        projects = projects.filter((project) => {
          return project.isArchived;
        });
      }
    }

    if (filters.client) {
      projects = projects.filter((project) => {
        if (Number(filters.client) === -1) return true;
        return Number(project.clientId) == Number(filters.client);
      });
    }

    return projects;
  } catch (error) {
    console.log(error);
    throw new HttpError('ServerError');
  }
};

export const getById = async (id: number) => {
  try {
    if (!id) throw new HttpError('BadRequest', 'Provide project id');

    const project = await Project.findByPk(id, {
      include: [{ model: Task, include: [{ model: Timer }] }, { model: User }],
    });
    return project;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const update = async (projectId: number, payload: UpdateProjectDTO) => {
  const { budget, isPublic, name, tasks, users, isArchived } = payload;
  try {
    if (!projectId) throw new HttpError('BadRequest', 'Provide project id');

    const project = await Project.findByPk(projectId);

    if (!project) {
      throw new HttpError('NotFound', 'Project not found');
    }

    await project.update({ budget, isPublic, name, isArchived });

    if (payload.users) {
      users?.map(async (user) => await project.addUsers(user.id));
    }
    const updatedProject = await Project.findByPk(projectId, {
      include: [{ model: Task, include: [{ model: Timer }] }, { model: User }],
    });
    return updatedProject;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const getProjectStatisctics = async (projectId: number) => {
  try {
    if (!projectId) throw new HttpError('BadRequest', 'Provide project id');

    const project = await Project.findByPk(projectId, {
      include: [{ model: Task, include: [{ model: Timer, include: [{ model: Task }, { model: User }] }] }],
    });

    if (!project) {
      throw new HttpError('NotFound', 'Project not found');
    }
    const allTasks = await Task.findAll({
      include: [{ model: Project, where: { id: projectId } }],
    });
    const completedTasks = allTasks.filter((task) => task.status === 'Done');
    const inProgressTasks = allTasks.filter((task) => task.status !== 'Done');
    // calculate total time spent on tasks on project
    const totalTimeSpent = calculateTimeSpentOnProject(project);
    const longestTasks = calculateLongestTasksOnProject(project);
    const averageTimeSpent = calculateAverageTimeSpentOnProject(project);
    const averageTimeEachUser = calculateAverageTimeSpentOnProjectByUser(project);

    return { completedTasks, inProgressTasks, totalTimeSpent, longestTasks, averageTimeSpent, averageTimeEachUser, allTasks };
  } catch (error) {
    throw new HttpError('ServerError');
  }
};
