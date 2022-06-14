import Project from '../../db/models/project';
import Task from '../../db/models/task';
import Timer from '../../db/models/timer';
import User from '../../db/models/user';
import { getProjectTime, getTasksTime } from '../../utils/report';
import { formatToHoursAndMinutes, getTimeDuration } from '../../utils/timer';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import moment from 'moment';
import { IPerformanceFilters } from '../../types/filters';
import { getDashBoardInfo } from '../../controllers/user.controller';
import { HttpError } from '../../types/error';
import { Op } from 'sequelize';
import { groupBy, toPairs } from 'lodash';

export const generateTrackingReport = async (project: string, user: string, dateFrom: string, dateTo: string) => {
  const doc = new jsPDF()
  const projects = await Project.findAll({
    include: [
      { model: User, as: 'users' },
      { model: Task, as: 'tasks', include: [{ model: Timer, as: 'timers' }] },
    ],
  });
  const filteredProjects = projects.filter(
    (p) => project.toLocaleLowerCase() === 'all' || p.name.toLocaleLowerCase().includes(project.toLocaleLowerCase())
  );
  // calculate each project time
  const projectTime = filteredProjects.map((item) => {
    return {
      projectInfo: {
        name: item.name,
        totalProjectTime: formatToHoursAndMinutes(getProjectTime(item, dateFrom, dateTo)),
        tasks: getTasksTime(item.tasks, dateFrom, dateTo),
      },
    };
  });
  return { projects: projectTime, dateFrom: moment(dateFrom).format('YYYY-MM-DD'), dateUntil: moment(dateTo).format('YYYY-MM-DD') };
};

const getTaskTime = (task: Task, dateFrom: string, dateTo: string) => {
  const timers = task.timers.filter((timer) => {
    return moment(timer.startDate).isBetween(dateFrom, dateTo, null, '[]');
  });
  const totalTime = timers.reduce((acc, timer) => {
    return acc + getTimeDuration(timer.startDate, timer.endDate);
  }, 0);
  return totalTime;
}

// get day time spent
const getDayTimeSpent = (timers: Timer[], date: string) => {
  const timersByDate = timers.filter((timer) => {
    return moment(timer.startDate).format('YYYY-MM-DD') === date;
  });
  const totalTime = timersByDate.reduce((acc, timer) => {
    return acc + getTimeDurationBetweenDates(timer.startDate, timer.endDate);
  }, 0);
  return totalTime;
}

const getPerformanceData = async (user: User, dateFrom: string, dateTo: string) => {
  const timers = await Timer.findAll({
    include: [{ model: User, where: { id: user.id } }, { model: Task, as: 'task', include: [{ model: Project, as: 'project' }, { model: Timer, as: 'timers' }] }],
  });
  const timersByDate = timers.filter((timer) => {
    return moment(timer.startDate).isBetween(dateFrom, dateTo, null, '[]') && !!timer.endDate
  });
  const totalTimeCalc = timersByDate.reduce((acc, timer) => {
    return acc + getTimeDurationBetweenDates(timer.startDate, timer.endDate);
  }, 0);
  const tasks = timersByDate.map((timer) => {
    const task = timer.task;
    const taskName = task.description;
    const day = moment(timer.startDate).format('YYYY-MM-DD');
    const time = getTimeDurationBetweenDates(timer.startDate, timer.endDate);
    return {
      task: taskName,
      taskId: task.id,
      day,
      formatted: convertToHoursAndMinutes(time),
      time: time,
      timers: task.timers,
    };
  });
  // group tasks by project and day
  const groupedTasks = groupBy(tasks, 'project');
  const groupedTasksByDay = toPairs(groupedTasks).map(([project, tasks]) => {
    const groupedTasksByDay = groupBy(tasks, 'day');
    return toPairs(groupedTasksByDay).map(([day, tasks]) => {
      const totalTime = tasks.reduce((acc, task: any) => {
        return acc + task.time;
      }, 0);
      return {
        day,
        time: convertToHoursAndMinutes(totalTime),
        // group task timers by task and calculate time spent on each task
        tasks: toPairs(groupBy(tasks, 'task')).map(([task, tasks]) => {
          const totalTime = tasks.reduce((acc, task: any) => {
            return acc + task.time;
          }
            , 0);
          return {
            task: task,
            taskId: tasks[0].taskId,
            timers: tasks[0].timers,
            xTime: totalTime,
            time: convertToHoursAndMinutes(totalTime),

          };
        }).sort((a, b) => {
          return b.xTime - a.xTime;
        }),
      };
    }).sort((a, b) => {
      return moment(b.day).diff(moment(a.day));
    });
  });
  return { user, groupedTasksByDay, totalTimeCalc: convertToHoursAndMinutes(totalTimeCalc) };
}

// get time duration between two dates in hours and minutes
export const getTimeDurationBetweenDates = (dateFrom: string, dateTo: string) => {
  const duration = moment.duration(moment(dateTo).diff(moment(dateFrom)));
  return duration.asMilliseconds();
}

// convert to hours and minutes in format hh:mm:ss where hours can be longer than 24 and hh is 2 digits
const convertToHoursAndMinutes = (time: number) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time - hours * 3600000) / 60000);
  const seconds = Math.floor((time - hours * 3600000 - minutes * 60000) / 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const totalTimeSpentByTime = (timers: Timer[], dateFrom: string, dateTo: string) => {
  const timersByDate = timers.filter((timer) => {
    return moment(timer.startDate).isBetween(dateFrom, dateTo, null, '[]');
  });
  const totalTime = timersByDate.reduce((acc, timer) => {
    return acc + getTimeDurationBetweenDates(timer.startDate, timer.endDate);
  }, 0);
  return convertToHoursAndMinutes(totalTime);
}



export const getUserPerformanceReview = async (filters: IPerformanceFilters) => {
  // check if user is provided in filters and if not, get all users
  // get total time for provided time period, user and projects
  const { userId, from, to, projects } = filters;
  let results: Array<any> = [];
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new HttpError('ServerError');
    }
    const result = await getPerformanceData(user, from, to);
    return result;

  } catch (error) {
    throw error;
  }
}
