"use strict";
exports.__esModule = true;
var sequelize_typescript_1 = require("sequelize-typescript");
var sequelizeConnection = new sequelize_typescript_1.Sequelize({ host: 'database-1.ck2gxojrvl41.us-east-1.rds.amazonaws.com', port: 3306, username: 'admin', password: 'Rekles123', database: 'kora', dialect: 'mysql', logging: false });
exports["default"] = sequelizeConnection;
