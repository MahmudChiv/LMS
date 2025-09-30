import express from "express";
import signup from "./routes/signup";
import sequelize from "./config/db";
import { Student } from "./models/Student";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json());
app.use("/auth/signup", signup);

async function main() {
  try {
    sequelize.addModels([Student]);
    await sequelize.sync({ alter: true }); 
    console.log("✅ Database connected and synced!");
  } catch (err) {
    console.error("❌ DB Error:", err);
  }
}

main();

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port http://localhost:3000")
);
