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
import { checkStatus, isUserAlreadyAdded } from '../../utils/projects';
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
  console.log('boardai', boards);
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
    const filteredProjects = allProjects.filter((project) =>
      (hasAccessToAllProjects(user)
        ? project
        : !project.users.filter((projectUser) => projectUser.id === user.id)) && checkStatus(project, filters)
    );
    return filteredProjects;
  } catch (error) {
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
