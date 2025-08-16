import express from "express";
import signupRouter from "./routes/signup.ts";

const app = express();

app.use(express.json());
app.use("/api/signup", signupRouter);


app.listen(3000, () => console.log('Server running on port http://localhost:3000'));
