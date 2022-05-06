import { HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Optional } from 'sequelize';
import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import sequelizeConnection from '../config';
import Client from './client';
import Task from './task';
import User from './user';
import UserProject from './user_project';

export interface ProjectAttributes {
  id: number;
  name: string;
  budget: number;
  isPublic?: boolean;
  isArchived?: boolean;
  isJiraProject?: boolean;
}

export interface ProjectInput extends Optional<ProjectAttributes, 'id' | 'isPublic'> { }

@Table
class Project extends Model<ProjectAttributes, ProjectInput> {
  declare addTask: HasManyAddAssociationMixin<Task, number>;
  declare addUsers: HasManyAddAssociationMixin<User, number>;
  declare addProject: HasManyAddAssociationMixin<Project, number>;
  declare getTasks: HasManyGetAssociationsMixin<Task>;
  @BelongsToMany(() => User, () => UserProject)
  users!: Array<User>;

  @ForeignKey(() => Client)
  @Column({ allowNull: true })
  clientId!: number

  @BelongsTo(() => Client)
  client!: Client;

  @HasMany(() => Task)
  tasks!: Array<Task>;

  @Column
  budget!: number;

  @Column
  name!: string;

  @Column({ defaultValue: false })
  isArchived!: boolean;

  @Column({ defaultValue: false })
  isJiraProject!: boolean;

  @Column({ defaultValue: true })
  isPublic!: boolean;
}

export default Project;
