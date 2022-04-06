import * as service from '../services/task/task.service';
import { CreateTaskDTO } from '../db/dto/task.dto';
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

