import { Request, Response, Router } from "express";
import { EStatus } from "../constants/status";
import { ERoles } from "../constants/user";
import { authorize } from "../middlewares/authorize";
import * as reportController from '../controllers/report.controller';
import { HttpError } from "../types/error";
import { template } from "../others/templates";
import pdf from 'html-pdf';

const reportsRouter = Router();

reportsRouter.get('/', authorize([ERoles.Admin]), async (req: Request, res: Response) => {
  const data: any = req.query;
  try {
    const result = await reportController.generateTrackingReport(data.project, data.user, data.dateFrom, data.dateTo);
    await pdf.create(template({ data: result })).toFile(`${__dirname}/document.pdf`, (err, rz) => {
      if (err) {
        return res.status(500);
      }
      res.sendFile(`${__dirname}/document.pdf`);
    });
    //   const result = await reportController.generateTrackingReport(data.project, data.user, data.dateFrom, data.dateTo);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

reportsRouter.get('/performance', authorize([ERoles.Admin]), async (req: Request, res: Response) => {
  const data: any = req.query;
  // parse projects (',' or if there is only 1 project '')
  const projects = data.projects.split(',') || [data.projects];
  try {
    const result = await reportController.getUsersPerformance({ ...data, projects });
    return res.status(200).send(result);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});


export default reportsRouter;
