import { ERoles } from "../constants/user";
import Project from "../db/models/project";
import User from "../db/models/user";
import { IJiraBoard } from "../types/jira";
import { isUserAlreadyAdded } from "./projects";

export const checkIfCanAddWithoutRestrictions = (user: User) => {
  if (user.role.includes(ERoles.Admin) || user.role.includes(ERoles.Moderator)) {
    return true;
  }
  return false;
}

export const compareProjects = async (project1: IJiraBoard, project2: Project, user: User) => {
  if (project1.location.projectName !== project2.name) {
    await project2.update({ name: project1.location.projectName });
  }

  if (project2.users && checkIfCanAddWithoutRestrictions(user) && !isUserAlreadyAdded(project2.users, user)) {
    await project2.addUsers(user);
  }
}