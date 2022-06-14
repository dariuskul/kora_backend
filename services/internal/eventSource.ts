import { Response } from "express";

export const writeDataToEventSource = (res: Response, data: string) => {
  res.write('data: ' + `${data}\n\n`);
};
