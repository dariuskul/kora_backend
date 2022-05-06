import { CreateClientDTO } from '../db/dto/client.dto';
import * as service from '../services/client/client.service';
import { HttpError } from '../types/error';

// add all the methods from service
export const create = async (payload: CreateClientDTO) => {
  try {
    return await service.createClient(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const getAll = async () => {
  try {
    return await service.getClients();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const getById = async (id: number) => {
  try {
    return await service.getClientById(id);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const update = async (id: number, payload: CreateClientDTO) => {
  try {
    return await service.updateClient(id, payload);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const remove = async (id: number) => {
  try {
    return await service.deleteClient(id);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const addClientToProject = async (projectId: number, clientId: number) => {
  try {
    return await service.addClientToProject(projectId, clientId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}




