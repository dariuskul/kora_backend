import { Response } from "express";
import moment from "moment";
import Project from "../../db/models/project";
import Task from "../../db/models/task";
import Timer from "../../db/models/timer"
import User from "../../db/models/user";
const INTERVAL = 10;
// export const stopTimer = async () => {
//   const timers = await Timer.findAll();
//   if (!timers) return;

//   timers.map(timer => {
//     if (!timer.endDate && (Number(Date.now()) - Number(new Date(timer.startDate)) > 5000)) {
//       timer.update({ endDate: new Date().toISOString() });
//       console.log('stopped');
//     }
//   })
// }


// return whether difference between now and date is greater than 5 seconds or not using moment.js library
export const isGreater = (date: string) => {
  const now = moment();
  const then = moment(date);
  const diff = now.diff(then);
  return diff > 30000;
}

export const addMiliseconds = (date: string, miliseconds: number) => {
  const then = moment(date);
  const newDate = then.add(miliseconds, 'ms');
  return newDate.toISOString();
}


const handleNotif = (timer: Timer) => {
  if (timer.endDate || !timer.user) return false;
  if (!timer.user.notifyAfter) return false;
  const now = moment();
  const startDateWithNotif = moment(timer.startDate).add(timer.user.notifyAfter, 'ms');
  if (now.isAfter(startDateWithNotif)) {
    return true;
  }
  return false;
}


export const calculateValues = async () => {
  const timers = await Timer.findAll({ include: [{ model: User, as: 'user' }] });
  if (!timers) return;
  const showNotifsTo: any = [];
  timers.forEach((timer) => {
    if (timer.endDate) return;
    if (handleNotif(timer)) {
      timer.update({ forcedStop: true });
      showNotifsTo.push(timer.user.id);
    }
    // if (!timer.endDate && isGreater(timer.startDate)) {
    //   showNotifsTo.push(timer.user.id);
    // }
  });
  return showNotifsTo;
}

export const getRealTimeData = async () => {
  const timers = await Timer.findAll({
    where: {
      endDate: null
    },
    include: [
      { model: Task, as: 'task', include: [{ model: Project, as: 'project' }] },
      { model: User, as: 'user' }
    ]
  });
  return timers;
}
