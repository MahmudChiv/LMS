import express from "express";
import authRoutes from "./src/routes/auth";
import sequelize from "./src/config/db";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    console.log("DB authenticated")
    await sequelize.sync({ alter: true }); 
    console.log("✅ Database synced successfully!");
  } catch (err) {
    console.error("❌ DB Error:", err);
  }
}

main();

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port http://localhost:3000")
);
