import sequelizeConnection from './config';
import Project from './models/project';
import User from './models/user';
// eslint-disable-next-line no-unused-vars
import Task from './models/task';
import Timer from './models/timer';
import UserProject from './models/user_project';


sequelizeConnection.addModels([User, Project, Task, Timer, UserProject])
export const connectDb = async () => {
  try {
    await sequelizeConnection.sync({ alter: true, logging: false });
    console.log('Database is connected');
  } catch (error) {
    console.log(error);
  }
};
