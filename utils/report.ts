import moment from 'moment';
import Project from '../db/models/project';
import Task from '../db/models/task';
import Timer from '../db/models/timer';
import { formatToHoursAndMinutes, getTimeDuration } from './timer';
import PDFDocument from 'pdfkit-table';
import fs from 'fs';
import { Response } from 'express';
import User from '../db/models/user';
import { sendEmail } from '../others/templates/email';
import { Op } from 'sequelize';
import { dailySummary } from '../others/templates/dailySummary';

export function getProjectTime(project: Project, dateFrom: string, dateTo: string): any {
  const projectTime = project.tasks.reduce((acc, item) => acc + Number(getTaskTime(item, dateFrom, dateTo) || 0), 0);
  return projectTime;
}

export function getTaskTime(item: Task, dateFrom: string, dateTo: string): any {
  // get timers between dates dateFrom and dateTo using moment
  const timers = item.timers.filter((timer) => {
    const startDate = moment(timer.startDate);
    const endDate = moment(timer.endDate);
    return startDate.isBetween(dateFrom, dateTo) || endDate.isBetween(dateFrom, dateTo);
  });
  const taskTime = timers.reduce((acc, item) => acc + Number(getTimerTime(item, dateFrom, dateTo) || 0), 0);
  return taskTime;
}

export function getTimerTime(item: Timer, dateFrom: string, dateTo: string): any {
  // check if timer is in date range
  const timerTime = getTimeDuration(item.startDate, item.endDate);
  return timerTime;
}

export const getTasksTime = (tasks: Array<Task>, dateFrom: string, dateTo: string) => {
  const filteredTasks = tasks.filter(task => !!task.timers.length);
  const tasksTime = filteredTasks.map((item) => {
    return {
      taskInfo: {
        name: item.description,
        totalTaskTime: formatToHoursAndMinutes(getTaskTime(item, dateFrom, dateTo)),
      },
    };
  });
  return tasksTime;
};

// get total time tracked today for a user
export const getTotalTimeTrackedToday = async (user: User): Promise<any> => {
  const timers = await Timer.findAll({
    include: [{ model: User, where: { id: user.id } }],
  });
  // get total time tracked this week for a user
  const thisWeekTimers = timers.filter((timer) => {
    const startDate = moment(timer.startDate);
    const endDate = moment(timer.endDate);
    return startDate.isBetween(moment().startOf('week'), moment().endOf('week'), null, '[]') || endDate.isBetween(moment().startOf('week'), moment().endOf('week'), null, '[]');
  });
  const totalTimeTrackedThisWeek = thisWeekTimers.reduce((acc, item) => acc + Number(getTimeDuration(item.startDate, item.endDate) || 0), 0);
  return totalTimeTrackedThisWeek;
};

// get project names and total time tracked today for a user
export const getProjectsAndTotalTimeTrackedToday = async (user: User): Promise<any> => {
  const today = moment().format('YYYY-MM-DD');
  const projects = await Project.findAll({
    include: [{ model: User, where: { id: user.id } }, { model: Task, as: 'tasks', include: [{ model: Timer, as: 'timers' }] }],
  });
  const projectTime = projects.map((item) => {
    return {
      projectInfo: {
        name: item.name,
        totalProjectTime: formatToHoursAndMinutes(getProjectTime(item, today, today)),
      },
    };
  });
  return projectTime;
};



// send email to user
export const sendDailySummary = async () => {
  const users = await User.findAll();
  users.map(async item => {
    if (item?.dailySummaries) {
      try {
        const totalTimeTracked = formatToHoursAndMinutes(await getTotalTimeTrackedToday(item));
        const projects = await getProjectsAndTotalTimeTrackedToday(item);
        await sendEmail([item.email], dailySummary({ totalTimeTracked, projects }), 'dailySummary', 'Kora daily summary');
      } catch (error) {
        throw error;
      }
    }
  })
}




