import * as service from '../services/task/task.service';
import { CreateTaskDTO, TaskFilters } from '../db/dto/task.dto';
import { HttpError } from '../types/error';

export const create = async (payload: CreateTaskDTO, projectId?: number) => {
  try {
    return await service.create(payload, projectId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const getAll = async (userId: number) => {
  try {
    return await service.getAll(userId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const removeTask = async (taskId: number) => {
  try {
    return await service.removeTask(taskId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};


export const getTasksByProjectId = async (projectId: number) => {
  try {
    return await service.getTasksByProjectId(projectId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};
export const getUserTasks = async (userId: number) => {
  try {
    return await service.getUserTasks(userId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const getAvailableTasks = async (userId: number, filters: TaskFilters, projectId?: number) => {
  try {
    return await service.getTasksByUserId(userId, filters, projectId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const updateTask = async (taskId: number, payload: CreateTaskDTO) => {
  try {
    return await service.updateTask(taskId, payload);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};


export const checkCsvFile = async (file: any) => {
  try {
    return await service.checkCsvFile(file);
  } catch (error) {
    throw error;
  }
}
