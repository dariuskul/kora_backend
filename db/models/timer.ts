import { Optional } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Task from './task';
import User from './user';

export interface TimerAttributes {
  id: number;
  startDate: string;
  endDate: string | null;
  time: number | null;

}

export interface TimerInput extends Optional<TimerAttributes, 'id' | 'time' | 'endDate'> { }

@Table
class Timer extends Model<TimerAttributes, TimerInput> {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Task)
  @Column
  taskId!: number;

  @BelongsTo(() => Task)
  task!: Task;

  @Column
  startDate!: string;

  @Column({ allowNull: true })
  endDate!: string;

  @Column({ allowNull: true })
  time!: number;
}
export default Timer;
