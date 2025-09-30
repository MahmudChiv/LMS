import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

console.log("DB URL:", process.env.DB_URI);

const sequelize = new Sequelize(process.env.DB_URI!, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
console.log("DB URL:", process.env.DB_URI);

export default sequelize;

