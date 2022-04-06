import moment from 'moment';
import Timer from '../../db/models/timer';

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
    months.push(monthObject);
  }

  return months.reverse();
}

const getTimeDuration = (startDate: string, endDate: string) => {
  const start = moment(startDate);
  const end = moment(endDate);
  const duration = moment.duration(end.diff(start));
  return duration.asMilliseconds();
};

// convert date to time in seconds
export const convertDateToTime = (date: string) => {
  console.log(moment(date).format('X'))
  return moment(date).format('X');
}


// calculate most time spent on project
// dont include month
export const calculateMostTimeSpentOnProject = (timers: Array<Timer>) => {
  const projects: any = [];
  timers.forEach((item) => {
    const project = projects.find((project) => project.id === item.task.projectId);
    if (project) {
      project.time += Number(getTimeDuration(item.startDate, item.endDate) || 0);
    } else {
      projects.push({
        id: item.task.projectId,
        name: item.task.project.name,
        time: Number(getTimeDuration(item.startDate, item.endDate) || 0),
      });
    }
  });
  // convert time to hours and minutes
  return projects.sort((a, b) => b.time - a.time);
}



