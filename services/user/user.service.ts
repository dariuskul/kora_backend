import { sign } from 'jsonwebtoken';
import { Sequelize } from 'sequelize-typescript';
import { AUTH } from '../../config';

import { ERoles } from '../../constants/user';
import { AuthenticateDTO, CreateUserDTO, UpdateUserDTO } from '../../db/dto/user.dto';
import Project from '../../db/models/project';
import Task from '../../db/models/task';
import Timer from '../../db/models/timer';
import User, { UserInput } from '../../db/models/user';
import { sendEmailRestorationEmail, sendVerificationEmail } from '../../others/templates/email';
import { HttpError } from '../../types/error';
import { compareHash, generateHash, generateRandomToken, omitHash } from '../../utils/auth';
import { calculateMostTimeSpentOnProject, formatTopTimers, getLast12Months } from '../../utils/timer';

export const create = async (payload: CreateUserDTO) => {
  if (!payload.email || !payload.fullName) {
    throw new HttpError('BadRequest', 'Required fields were not provided');
  }
  const user = await User.findOne({ where: { email: payload.email } });

  if (user && user.status === 'pending') {
    const newUser = await update(user.id, { ...payload, verificationToken: '', status: 'verified' });
    return newUser;
  }

  if (!user && payload.role === 'Admin') {
    const passwordHash = generateHash(payload.password, 15);
    const userData: UserInput = {
      email: payload.email,
      fullName: payload.fullName,
      dateOfBirth: payload.dateOfBirth,
      role: payload.role || ERoles.User,
      passwordHash
    };
    try {
      const user = User.create(userData);
      return user;
    } catch (error) {
      throw new HttpError('ServerError');
    }
  } else {
    throw new HttpError('Unauthorized');
  }
};

export const removeUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new HttpError('NotFound');
  }
  try {
    await user.destroy();
  } catch (error) {
    throw new HttpError('ServerError', 'Could not delete user');
  }
};


export const getAll = async () => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['passwordHash'] }, include: { model: Project, as: 'projects' } });
    return users;
  } catch (error) {
    throw new HttpError('ServerError');
  }
};

export const authenticate = async (payload: AuthenticateDTO) => {
  const { email: payloadEmail, password } = payload;
  if (!payloadEmail || !password) {
    throw new HttpError('BadRequest', 'Email and password are required');
  }

  const user = await User.findOne({ where: { email: payloadEmail } });

  if (!user || !compareHash(password, user.passwordHash) || user.status === 'pending') {
    throw new HttpError('BadRequest', 'Provided credentials are not correct');
  }

  const token = sign({ sub: user.id, role: user.role }, AUTH.JWT, { expiresIn: '2h' });

  return { ...omitHash(user.get()), token };
};

export const update = async (userId: string, payload: UpdateUserDTO) => {
  if (!userId) {
    throw new HttpError('BadRequest', 'Provide user id');
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw new HttpError('NotFound', 'User was not found');
  }
  let passwordHash;
  if (payload.password) {
    passwordHash = generateHash(payload.password, 15);
  }

  Object.assign(user, { ...payload, passwordHash });

  return await user.save();
};

export const addUser = async (email: string) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    throw new HttpError('BadRequest', 'There is already user with provided email');
  }
  const token = generateRandomToken();

  await User.create({ email, fullName: '', passwordHash: '', role: 'user', verificationToken: token, dateOfBirth: '' });

  await sendVerificationEmail(email, token);

  return user;
}

export const getUserByVerificationToken = async (token: string) => {
  const user = await User.findOne({ where: { verificationToken: token } });

  if (!user) {
    throw new HttpError('BadRequest', 'Token invalid');
  }

  return user;
}

export const getUserDashBoardInfo = async (userId: string) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new HttpError('BadRequest', 'User not found');
  }

  try {
    // get all user timers include project and task
    const timers = await Timer.findAll({
      // only get timers that belong to user
      include: [
        { model: Task, as: 'task', include: [{ model: Project, as: 'project' }] },
      ]
    });
    const usersTimers = timers.filter(timer => timer.userId === Number(userId));
    const getLast6Months = getLast12Months(usersTimers);
    const topProjects = calculateMostTimeSpentOnProject(usersTimers);
    return { last6Months: getLast6Months, topProjects };
  } catch (error) {
    throw new HttpError('ServerError');
  }
}

// get all current running timers for all users
export const getAllRunningTimers = async () => {
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

export const resetPassword = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new HttpError('BadRequest', 'User not found');
  }

  let passwordHash = generateHash(password, 15);

  Object.assign(user, { passwordHash });
  // update user password
  await user.save();

  return user;
}

export const senddPasswordRestoreLink = async (email: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new HttpError('BadRequest', 'User not found');
  }

  const token = generateRandomToken();

  await User.update({ verificationToken: token }, { where: { email } });

  await sendEmailRestorationEmail(email, token);

  return user;
}

