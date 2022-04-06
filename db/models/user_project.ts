import { DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, Optional } from 'sequelize';
import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import sequelizeConnection from '../config';
import Project from './project';
import Timer from './timer';
import User from './user';



@Table
class UserProject extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Project)
  @Column
  projectId!: number;


}

export default UserProject;
