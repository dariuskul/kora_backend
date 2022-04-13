import { IUpdateTimerDTO } from '../db/dto/timer.dto';
import * as service from '../services/timer/timer.service';
import { HttpError } from '../types/error';

export const start = async (taskId: number, userId: number) => {
  try {
    return await service.start(taskId, userId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const stop = async (userId: number) => {
  try {
    return await service.stop(userId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const getUserEntries = async (userId: number) => {
  try {
    return await service.getUserEntries(userId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const getCurrentTimer = async (userId: number) => {
  try {
    return await service.getCurrentRunningTimer(userId);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

// updateTimer
export const updateTimer = async (timerId: number, payload: IUpdateTimerDTO) => {
  try {
    return await service.updateTimer(timerId, payload);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}


