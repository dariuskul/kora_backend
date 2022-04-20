import * as service from '../services/report/report.service';
import { HttpError } from '../types/error';
export const generateTrackingReport = async (project: string, user: string, dateFrom: string, dateTo: string) => {
  try {
   return  await service.generateTrackingReport(project, user, dateFrom, dateTo);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
};
