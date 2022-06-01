import moment from 'moment';
import Project from '../../db/models/project';
import Timer from '../../db/models/timer';
import User from '../../db/models/user';

export const checkIfHasTimerRunning = (timers?: Array<Timer>) => {
  if (!timers) {
    return null;
  }
  const runningTimer = timers.find((item) => item.endDate === '');

  if (runningTimer) {
    return runningTimer;
  }

  return null;
};

export const formatTopTimers = (timers: Array<Timer>) => {
  return timers.map((item) => ({ name: item.task.description, time: Number(item.endDate) - Number(item.startDate) }));
};

export const getLast12Months = (timers: Array<Timer>) => {
  const months: any = [];
  let overTimeMonths: any = [];
  const currentMonth = moment().format('MMMM');
  const currentYear = moment().format('YYYY');
  const currentMonthTimers = timers.filter((item) => moment(item.startDate).format('MMMM') === currentMonth && moment(item.startDate).format('YYYY') === currentYear);
  const currentMonthTime = currentMonthTimers.reduce((acc, item) => acc + Number(getTimeDuration(item.startDate, item.endDate) || 0), 0);
  const currentMonthObject = {
    month: currentMonth,
    time: currentMonthTime,
  };
  months.push(currentMonthObject);


  for (let i = 1; i < 6; i++) {
    const month = moment().subtract(i, 'months').format('MMMM');
    const year = moment().subtract(i, 'months').format('YYYY');
    const monthTimers = timers.filter((item) => moment(item.startDate).format('MMMM') === month && moment(item.startDate).format('YYYY') === year);
    const monthTime = monthTimers.reduce((acc, item) => acc + Number(getTimeDuration(item.startDate, item.endDate) || 0), 0);
    const monthObject = {
      month,
      time: monthTime,
    };
    const overTimeObject = {
      month,
      time: monthTime > 306000000 ? monthTime : 0,
    };
    overTimeMonths.push(overTimeObject);
    months.push(monthObject);
  }
  return { months: months.reverse(), overTimeMonths: overTimeMonths.reverse() };
}

export const getTimeDuration = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) {
    return 0;
  }
  const start = moment(startDate);
  const end = moment(endDate);
  const duration = moment.duration(end.diff(start));
  return duration.asMilliseconds();
};

// convert date to time in seconds
export const convertDateToTime = (date: string) => {
  return moment(date).format('X');
}

export const calculateMostTimeSpentOnProject = (timers: Array<Timer>) => {
  const projects: any = [];
  timers.forEach((item) => {
    const project = projects.find((project) => project.id === item.task.projectId);
    if (project) {
      project.time += Number(getTimeDuration(item.startDate, item.endDate) || 0);
    } else {
      projects.push({
        id: item.task.projectId,
        name: item.task.project?.name,
        time: Number(getTimeDuration(item.startDate, item.endDate) || 0),
      });
    }
  });
  // convert time to hours and minutes
  return projects.sort((a, b) => b.time - a.time);
}

export const formatToHoursAndMinutes = (time: number) => {
  if (!time) {
    return '00:00';
  }
  var dur = moment.duration(time, 'ms');
  var hours = Math.floor(dur.asHours());
  var mins = Math.floor(dur.asMinutes()) - hours * 60;

  var result = `${hours < 10 ? `0${hours}` : hours}` + ":" + `${mins < 10 ? `0${mins}` : mins}`;
  return result;
}

// get local sceridial time
export const getLocalSceralTime = (date: string) => {
  const time = moment(date).format('HH:mm');
  return time;
}


// calculate time spent on project
export const calculateTimeSpentOnProject = (project: Project) => {
  // get all tasks
  const tasks = project.tasks;
  // get all tasks timers
  const timers = tasks.reduce((acc, item) => acc.concat(item.timers), [] as any);

  // calculate total time of timers 
  const totalTime = timers.reduce((acc, item) => acc + Number(getTimeDuration(item.startDate, item.endDate) || 0), 0);
  // convert time to hours and minutes
  const totalTimeFormatted = formatToHoursAndMinutes(totalTime);
  return totalTimeFormatted;
}

// calculate longest tasks on project
export const calculateLongestTasksOnProject = (project: Project) => {
  // get all tasks
  const tasks = project.tasks;
  // get all tasks timers
  const timers = tasks.reduce((acc, item) => acc.concat(item.timers), [] as any);

  // get each tasks time duration
  const tasksTimeDuration = timers.map((item) => { return { name: item.task.description, time: Number(getTimeDuration(item.startDate, item.endDate) || 0) } });

  // get top 5 longest tasks
  const top5LongestTasks = tasksTimeDuration.sort((a, b) => b.time - a.time).slice(0, 5);

  // convert time to hours and minutes
  const top5LongestTasksFormatted = top5LongestTasks.map((item) => {
    const time = formatToHoursAndMinutes(item.time);
    return { name: item.name, time };
  });


  return top5LongestTasksFormatted;
}
export const calculateAverageTimeSpentOnProject = (project: Project) => {
  const tasks = project.tasks;
  const timers = tasks.reduce((acc, item) => acc.concat(item.timers), [] as any);
  const totalTime = timers.reduce((acc, item) => acc + Number(getTimeDuration(item.startDate, item.endDate) || 0), 0);
  const numberOfTasks = tasks.filter((item) => item.timers.length > 0).length;
  const averageTime = totalTime / numberOfTasks;
  const averageTimeFormatted = formatToHoursAndMinutes(averageTime);

  return averageTimeFormatted;
}
export const calculateAverageTimeSpentOnProjectByUser = (project: Project) => {
  const timers = project.tasks.reduce((acc, item) => acc.concat(item.timers), [] as any);

  const usersTimeDuration = timers.map((item) => { return { user: item.user.fullName, time: Number(getTimeDuration(item.startDate, item.endDate) || 0) } });

  const usersTimeDurationFormatted = usersTimeDuration.reduce((acc, item) => {
    const user = acc.find((user) => user.user === item.user);
    if (user) {
      user.time += item.time;
    } else {
      acc.push({ user: item.user, time: item.time });
    }
    return acc;
  }, [] as any);

  // get average time for each user
  const usersTimeDurationFormattedWithAverage = usersTimeDurationFormatted.map((item) => {
    return { user: item.user, time: item.time };
  }
  );

  return usersTimeDurationFormattedWithAverage;
}

export const calculateAlltimeSpentByUser = (timers: Array<Timer>) => {
  const totalTime = timers.reduce((acc, item) => acc + Number(getTimeDuration(item.startDate, item.endDate) || 0), 0);
  const totalTimeFormatted = formatToHoursAndMinutes(totalTime);
  return totalTimeFormatted;
}
