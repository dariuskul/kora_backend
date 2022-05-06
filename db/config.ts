import { Sequelize } from 'sequelize-typescript';

const sequelizeConnection = new Sequelize({
  host: 'database-1.ck2gxojrvl41.us-east-1.rds.amazonaws.com',
  port: 3306,
  username: 'admin',
  password: 'Rekles123',
  database: 'kora',
  dialect: 'mysql',
  logging: false,
});

export default sequelizeConnection;
