import * as service from '../services/report/report.service';
import { HttpError } from '../types/error';
import { IPerformanceFilters } from '../types/filters';
export const generateTrackingReport = async (project: string, user: string, dateFrom: string, dateTo: string) => {
  try {
    return await service.generateTrackingReport(project, user, dateFrom, dateTo);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};

export const getUsersPerformance = async (filters: IPerformanceFilters) => {
  try {
    return await service.getUserPerformanceReview(filters);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}
