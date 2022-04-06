import { EProjectStatus } from '../constants/project';
import { IProjectFilters } from '../db/dto/project.dto';
import Project from '../db/models/project';
import User from '../db/models/user';

export const isUserAlreadyAdded = (users: Array<User>, user: User) => {
  return users.includes(user);
};

export const checkStatus = (project: Project, filters: IProjectFilters) => {
  const { status = EProjectStatus.Active, access = 'All' } = filters;

  return checkArchived(project, status) && checkAccess(project, access);
};

const checkArchived = (project: Project, status: string) => {
  if (status === EProjectStatus.All) {
    return true;
  }
  if (status === EProjectStatus.Archived && project.isArchived) {
    return true;
  }
  if (status === EProjectStatus.Active && !project.isArchived) {
    return true;
  }
  return false;
}

const checkAccess = (project: Project, access: string) => {
  if (access === 'All') {
    return true;
  }
  if (access === 'Public' && project.isPublic) {
    return true;
  }
  if (access === 'Private' && !project.isPublic) {
    return true;
  }
  return false;
}

