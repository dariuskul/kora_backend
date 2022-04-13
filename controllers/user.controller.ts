import * as service from '../services/user/user.service';
import { AuthenticateDTO, CreateUserDTO, UpdateUserDTO } from '../db/dto/user.dto';
import { HttpError } from '../types/error';

export const create = async (payload: CreateUserDTO) => {
  try {
    return await service.create(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const getAll = async () => {
  try {
    return await service.getAll();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const login = async (payload: AuthenticateDTO) => {
  try {
    return await service.authenticate(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const update = async (userId: string, payload: UpdateUserDTO) => {
  try {
    return await service.update(userId, payload);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const addUser = async (email: string) => {
  try {
    return await service.addUser(email);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const getUserByToken = async (token: string) => {
  try {
    return await service.getUserByVerificationToken(token);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const getDashBoardInfo = async (userId: string) => {
  try {
    return await service.getUserDashBoardInfo(userId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const getAdminDashBoard = async () => {
  try {
    return await service.getAllRunningTimers();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}
