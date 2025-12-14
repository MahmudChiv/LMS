import { Sequelize } from "sequelize-typescript";
import { Student } from "../models/Student";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DRIVER } = process.env;

const sequelize = new Sequelize({
  database: DB_NAME!,
  dialect: DB_DRIVER as any,
  username: DB_USER!,
  password: DB_PASS!,
  host: DB_HOST!,
  logging: false,
  models: [Student],
});

export default sequelize;

// dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },