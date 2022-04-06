import { ERoles } from "../constants/user";
import User from "../db/models/user";

export const hasAccessToAllProjects = (user: User) => user.role.includes(ERoles.Admin) || user.role.includes(ERoles.Moderator);