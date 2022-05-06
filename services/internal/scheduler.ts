import { Response } from "express";
import moment from "moment";
import Project from "../../db/models/project";
import Task from "../../db/models/task";
import Timer from "../../db/models/timer"
import User from "../../db/models/user";

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

// check if 30 seconds left until timer ends
export const checkTimer = (timer: Timer) => {
  const now = moment();
  const then = moment(timer.startDate).add(timer.user.notifyAfter, 'ms');
  const diff = then.diff(now);
  const miliseconds = 30000 - diff;
  if (miliseconds > 0) {
    console.log(miliseconds);
    return true;
  }
  return false;
}

export const getMedian = async (user: User) => {
  if (!user) return 0;
  const timers = await Timer.findAll({ include: [{ model: User, where: { id: user.id } }] });
  const times = timers.map(timer => {
    return moment(timer.endDate).diff(moment(timer.startDate), 'minutes');
  });
  const filteredTimes = times.filter(time => time > 0);
  console.log(filteredTimes.sort((a, b) => a - b));
  // avergage of filtered times
  const average = filteredTimes.reduce((a, b) => a + b, 0) / filteredTimes.length;
  const itemsWithDev = filteredTimes.map(item => {

    return { item: item, dev: Math.abs(item - average) };
  })
  // sort filtered times by deviation
  const sorted = itemsWithDev.sort((a, b) => a.dev - b.dev);
  // console.log('STUFF', sorted)
  const median = filteredTimes.sort((a, b) => a - b)[Math.floor(filteredTimes.length / 2)];
  return median;
}


const handleNotif = async (timer: Timer) => {
  console.log('median', await getMedian(timer.user));
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
  const showWarning: any = [];
  timers.forEach(async (timer) => {
    if (timer.endDate) return;
    if (await handleNotif(timer)) {
      showNotifsTo.push(timer.user.id);
    } else {
      if (timer.user?.notifyAfter && checkTimer(timer)) {
        showWarning.push(timer.user.id);
      }
    }
    // if (!timer.endDate && isGreater(timer.startDate)) {
    //   showNotifsTo.push(timer.user.id);
    // }
  });
  return { showNotifsTo, showWarning };
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
