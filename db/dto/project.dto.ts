import User from "../models/user";

export type CreateProjectDTO = {
  name: string;
  budget: number;
  tasks: number;
  isPublic?: boolean;
  users?: Array<User>;
  isArchived?: boolean;
};

export type UpdateProjectDTO = Partial<CreateProjectDTO>;

export interface IProjectFilters {
  status?: string;
  access?: string;
}