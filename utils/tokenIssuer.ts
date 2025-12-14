import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Student } from "../src/models/Student";

dotenv.config();

export function issueJWT(student: Student) {
  const id = student.id;

  const expiresIn = "1d";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: expiresIn,
    algorithm: "HS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
