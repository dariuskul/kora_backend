import { HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Optional } from 'sequelize';
import { BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import sequelizeConnection from '../config';
import Project from './project';

export interface ClientAttributes {
  id: number;
  name: string;
}

export interface ClientInput extends Optional<ClientAttributes, 'id'> { }

@Table
class Client extends Model<ClientAttributes, ClientInput> {
  declare addProject: HasManyAddAssociationMixin<Project, number>;
  @Column
  name!: string;

  @HasMany(() => Project)
  projects!: Array<Project>;
}

export default Client;
