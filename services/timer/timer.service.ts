import { groupBy, toPairs } from 'lodash';
import moment from 'moment';
import { Op } from 'sequelize';
import { IUpdateTimerDTO } from '../../db/dto/timer.dto';
import Project from '../../db/models/project';
import Task from '../../db/models/task';
import Timer from '../../db/models/timer';
import User from '../../db/models/user';
import { HttpError } from '../../types/error';
import { asignTaskToUser } from '../task/task.service';

export const current = async (user: User) => {
  try {
    const timers = await user.getTimers();
    return timers;
  } catch (error) {
    console.error(error);
  }
};

// update timer 
export const updateTimer = async (timerId: number, payload: IUpdateTimerDTO) => {
  try {
    const timer = await Timer.findByPk(timerId);
    if (!timer) {
      throw new HttpError('NotFound', 'Timer not found');
    }
    timer.update({ forcedStop: false, ...payload })
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }
}

export const start = async (taskId: number, userId: number) => {
  if (!taskId) {
    throw new HttpError('BadRequest', 'Task was not provided');
  }

  const task = await Task.findByPk(taskId);
  const user = await User.findByPk(userId);

  if (!task) {
    throw new HttpError('NotFound', 'Task was not found');
  }

  if (!user) {
    throw new HttpError('NotFound', 'Something went wrong');
  }

  try {
    const timer = await Timer.create({ startDate: moment().format(), endDate: null });
    await task.addTimer(timer);
    await user.addTimer(timer);
    await asignTaskToUser(taskId, userId);
    const formattedTimer = await Timer.findOne({
      where: { id: timer.id },
      include: [{ model: User, where: { id: userId } }, { model: Task }],
    });
    return formattedTimer;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const stop = async (userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new HttpError('NotFound', 'Something went wrong');
  }

  const currentTimer = await getCurrentRunningTimer(userId);

  if (!currentTimer) {
    throw new HttpError('NotFound', 'Not timers exists');
  }

  try {
    await currentTimer.update({ endDate: moment().format() });
    const newTimer = await Timer.findOne({
      where: { id: currentTimer.id },
      include: [{ model: User, where: { id: userId } }, { model: Task, include: [{ model: Project }] }],
    });
    return newTimer;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

const getWeeklyEntries = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return;
  }
  const timers = await user.getTimers({ include: [{ model: Task, include: [{ model: Project }] }] });
  const groupedTimers = groupBy(timers, (timer) => moment(timer.startDate).startOf('week').format('YYYY-MM-DD'));
  const groupedTimersArray = toPairs(groupedTimers);
  const weeklyEntries: any = [];
  groupedTimersArray.forEach((group) => {
    const weeklyEntry = {
      week: group[0],
      startDate: moment(group[0]).startOf('week').format('YYYY-MM-DD'),
      endDate: moment(group[0]).endOf('week').format('YYYY-MM-DD'),
      projectEntries: [] as any,
    };
    group[1].forEach((timer) => {
      const projectEntry = {
        project: timer.task?.project?.name || '',
        task: timer.task,
        startDate: timer.startDate,
        endDate: timer.endDate,
        forced: timer.forcedStop,
        id: timer.id,
      };
      if (projectEntry.endDate) {
        weeklyEntry.projectEntries.push(projectEntry);
      }
    });
    if (!weeklyEntry.projectEntries.length) {
      return;
    }
    const groupedProjectEntries = groupBy(weeklyEntry.projectEntries, (projectEntry) => moment(projectEntry.startDate).format('YYYY-MM-DD'));
    const groupedProjectEntriesArray = toPairs(groupedProjectEntries);
    const projectEntriesByDay: any = [];
    groupedProjectEntriesArray.forEach((group) => {
      const projectEntriesByDayObject = {
        day: group[0],
        projectEntries: [] as any,
      };
      group[1].forEach((projectEntry) => {
        projectEntriesByDayObject.projectEntries.push(projectEntry);
      });
      projectEntriesByDay.push(projectEntriesByDayObject);
    });
    weeklyEntry.projectEntries = projectEntriesByDay.reverse();
    weeklyEntries.push(weeklyEntry);
  });
  return weeklyEntries.reverse();
};



export const getUserEntries = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new HttpError('NotFound', 'Something went wrong');
  }

  try {
    const projectEntries = await getWeeklyEntries(userId);
    return projectEntries;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const getCurrentRunningTimer = async (userId: number) => {
  try {
    const timer = await Timer.findOne({
      where: { endDate: { [Op.eq]: null } },
      include: [{ model: Task }, { model: User, where: { id: userId } }],
    });
    return timer;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};


export const editTimeForTask = async (userId: number, taskId: number, date: string, duration: number) => {
  // find task timers for the given date
  const task = await Task.findByPk(taskId);
  const user = await User.findByPk(userId);
  if (!task) {
    throw new HttpError('NotFound', 'Task not found');
  }
  if (!user) {
    throw new HttpError('NotFound', 'User not found');
  }
  const timers = await task.getTimers({ include: [{ model: User, where: { id: userId } }] });
  const timersForDate = timers.filter((timer) => moment(timer.startDate).format('YYYY-MM-DD') === date);
  if (!timersForDate.length) {
    throw new HttpError('NotFound', 'No timers found for the given date');
  }
  const totalDuration = timersForDate.reduce((acc, timer) => {
    return acc + Math.abs(moment(timer.endDate).diff(timer.startDate, 'milliseconds'));
  }, 0);
  let durationVariable = duration;
  timersForDate.forEach((timer) => {
    if (timer.forcedStop) {
      timer.update({ forcedStop: false });
    }
  })
  if (durationVariable < totalDuration) {
    timersForDate.forEach((timer) => {
      if (!timer.endDate) {
        return;
      }
      const diff = moment(timer.endDate).diff(timer.startDate, 'milliseconds');
      if (diff > durationVariable) {
        timer.update({ endDate: moment(timer.startDate).add(durationVariable, 'milliseconds').format() });
        durationVariable = 0;
        return;
      } else {
        timer.destroy();
        durationVariable -= diff;
      }
    });
  } else if (duration > totalDuration) {
    const milisecondsToAdd = duration - totalDuration;
    timersForDate[0].update({ endDate: moment(timersForDate[0].endDate).add(milisecondsToAdd, 'milliseconds').format() });
  }

};
