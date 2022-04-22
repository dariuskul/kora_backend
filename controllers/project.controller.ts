import { CreateProjectDTO, IProjectFilters, UpdateProjectDTO } from '../db/dto/project.dto';
import * as service from '../services/project/project.service';
import { HttpError } from '../types/error';

export const create = async (userId: number, payload: CreateProjectDTO) => {
  try {
    return await service.create(userId, payload);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const remove = async (projectId: number) => {
  try {
    return await service.remove(projectId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const getAll = async (userId: number, projectFilters: IProjectFilters) => {
  try {
    return await service.getAll(userId, projectFilters);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const getById = async (id: number) => {
  try {
    return await service.getById(id);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const update = async (projectId: number, payload: UpdateProjectDTO) => {
  try {
    return await service.update(projectId, payload);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const getProjectStatisctics = async (projectId: number) => {
  try {
    return await service.getProjectStatisctics(projectId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}
