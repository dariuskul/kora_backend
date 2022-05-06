import { parse } from 'csv/sync';
import moment from 'moment';
import { CreateTaskDTO, TaskFilters } from '../../db/dto/task.dto';
import Project from '../../db/models/project';
import Task from '../../db/models/task';
import User from '../../db/models/user';
import { HttpError } from '../../types/error';
import { hasAccessToProject } from '../../utils/projects';
import { hasAccessToAllProjects } from '../../utils/user';
import { getIssues } from '../integrations/jira/jira.service';
import { synchronizeProjects } from '../project/project.service';

export const create = async (payload: CreateTaskDTO, projectId?: number) => {
  if (!payload.description) {
    throw new HttpError('BadRequest', 'Provide task description');
  }

  let project;

  if (projectId) {
    try {
      project = await Project.findByPk(projectId);
    } catch (error) {
      throw new HttpError('ServerError');
    }
  }

  if (projectId && !project) {
    throw new HttpError('NotFound', 'Project could not be found with provided id');
  }

  try {
    const task = await Task.create({ ...payload, status: 'Active' });
    if (projectId && project) {
      await project.addTask([task]);
    }
    return task;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const synchronizeTasks = async (boardId: string) => {
  const boardIssues = await getIssues(boardId);

  boardIssues.issues.forEach(async (issue) => {
    const task = await Task.findByPk(issue.id);
    const project = await Project.findByPk(issue.fields.project.id);
    if (task || !project) {
      return;
    }
    const newTask = await Task.create({ id: issue.id, description: issue.fields.summary, status: 'Active' });
    if (project) {
      await project.addTask(newTask);
    }
  });
};

export const getAll = async (userId: number) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new HttpError('ServerError');
    }
    await synchronizeProjects(user);
    const tasks = await Task.findAll({ include: [{ model: Project, include: [{ model: User }] }] });
    const filteredTasks = tasks.filter((task) =>
      hasAccessToAllProjects(user) ? task : hasAccessToProject(user, task.project),
    );
    return filteredTasks;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const getTasksByProjectId = async (projectId: number) => {
  if (!projectId) {
    throw new HttpError('BadRequest', 'Project id is missing!');
  }

  const project = await Project.findByPk(projectId);

  if (!project) {
    throw new HttpError('NotFound', 'Project not found with that id');
  }

  try {
    const tasks = await project.getTasks({ where: {}, include: Project });
    return tasks;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const asignTaskToUser = async (taskId: number, userId: number) => {
  if (!taskId || !userId) {
    throw new HttpError('BadRequest', 'Provide task id and user id');
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new HttpError('NotFound', 'Task not found with that id');
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw new HttpError('NotFound', 'User not found with that id');
  }

  try {
    await user.addTask(task);
    return task;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const getUserTasks = async (userId: number) => {
  if (!userId) {
    throw new HttpError('BadRequest', 'Provide user id');
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw new HttpError('NotFound', 'User not found with that id');
  }

  try {
    const tasks = await Task.findAll({ include: [{ model: Project, include: [{ model: User }] }] });
    const accessableTasks = tasks.filter((task) =>
      hasAccessToAllProjects(user) ? task : hasAccessToProject(user, task.project),
    );
    const assignedTasks = accessableTasks.filter((task) => task.assigneeId === userId);
    return assignedTasks;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

// get all tasks from projects that user has access to
export const getTasksByUserId = async (userId: number, filters: TaskFilters, projectId?: number) => {
  if (!userId) {
    throw new HttpError('BadRequest', 'Provide user id');
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw new HttpError('NotFound', 'User not found with that id');
  }

  try {
    const tasks = await Task.findAll({
      include: [
        { model: Project, include: [{ model: User }] },
        { model: User, as: 'assignee', attributes: ['fullName', 'id'] },
      ],
    });
    const accessableTasks = tasks.filter((task) =>
      hasAccessToAllProjects(user) ? task : hasAccessToProject(user, task?.project)
    );
    // if project id is provided, filter tasks by project id
    if (projectId) {
      const project = await Project.findByPk(projectId);
      if (!project) {
        throw new HttpError('NotFound', 'Project not found with that id');
      }
      const projectTasks = accessableTasks.filter((task) => task.projectId === projectId);
      return projectTasks;
    }
    // if filters are provided, filter tasks by filters
    if (filters) {
      const { projectId, assignee, status } = filters;
      const filteredTasks = accessableTasks.filter((task) => {
        if (assignee === 'All' && projectId === 'All' && status === 'All') return true;
        if (projectId && projectId !== 'All' && Number(task.projectId) !== Number(projectId)) {
          return false;
        }
        if ((task.assignee?.id) && assignee === 'None') {
          return false;
        }
        if (status !== 'All' && task.status !== status) {
          return false;
        }
        if (Number(task?.assignee?.id) !== Number(assignee) && assignee !== 'None' && assignee !== 'All') {
          return false;
        }
        return true;
      });
      return filteredTasks;
    }
    return accessableTasks;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const getTaskById = async (taskId: number) => {
  if (!taskId) {
    throw new HttpError('BadRequest', 'Provide task id');
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new HttpError('NotFound', 'Task not found with that id');
  }

  try {
    return task;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const removeTask = async (taskId: number) => {
  if (!taskId) {
    throw new HttpError('BadRequest', 'Provide task id');
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new HttpError('NotFound', 'Task not found with that id');
  }

  try {
    await task.destroy();
    return task;
  } catch (error) {
    throw new HttpError('ServerError');
  }
}

export const updateTask = async (taskId: number, payload: CreateTaskDTO) => {
  if (!taskId) {
    throw new HttpError('BadRequest', 'Provide task id');
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new HttpError('NotFound', 'Task not found with that id');
  }

  try {
    if (payload.description || payload.status) {
      await task.update(payload);
    }
    if (payload.assigneeId) {
      let user;
      if (payload.assigneeId !== -1) {
        user = await User.findByPk(payload.assigneeId);
      }
      if (task.assignee || task.assigneeId) {
        const oldAssignee = await User.findByPk(task.assigneeId);
        if (!oldAssignee) {
          throw new HttpError('NotFound', 'User not found with that id');
        }
        await oldAssignee.removeTask(task.id);
      }
      if (payload.assigneeId !== -1 && user) {
        await user.addTask(taskId);
      }
    }
    return task;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

// get task's timers and filter by day

export const getTaskTimers = async (taskId: number, day: string) => {
  if (!taskId) {
    throw new HttpError('BadRequest', 'Provide task id');
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new HttpError('NotFound', 'Task not found with that id');
  }

  const momentDay = moment(day);

  try {
    const timers = await task.getTimers();
    const filteredTimers = timers.filter((timer) => {
      return momentDay.diff(moment(timer.endDate), 'days') === 0;
    });
    return filteredTimers;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const checkCsvFile = async (file: any) => {
  if (!file || !file.originalname.endsWith('.csv')) {
    throw new HttpError('BadRequest', 'Provide csv file');
  }
  const fileBuffer = file.buffer.toString('utf8');
  try {
    const rawData = await parse(fileBuffer);
    // flatten array
    const data = rawData.reduce((acc, cur) => acc.concat(cur), []);
    return { parsedTasks: data };
  } catch (error) {
    throw new HttpError('BadRequest', 'Provided file is in bad format');
  }
};
