import Project from '../../db/models/project';
import Task from '../../db/models/task';
import Timer from '../../db/models/timer';
import User from '../../db/models/user';
import { getProjectTime, getTasksTime } from '../../utils/report';
import { formatToHoursAndMinutes, getTimeDuration } from '../../utils/timer';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import moment from 'moment';

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
  return { projects: projectTime, dateFrom: moment(dateFrom).format('YYYY-MM-DD'), dateUntil: moment(dateTo).format('YYYY-MM-DD')  };
};
