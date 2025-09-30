import { Request, Response } from "express";
import { Student } from "../models/Student";
import { validationResult } from "express-validator";
import { UUIDV4 } from "sequelize";

interface SignupRequestBody {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
}

const signupContoller = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, dateOfBirth, gender } = req.body;

    const newStudent = await Student.create({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      studentId: UUIDV4(),
    });

    res.status(200).json({ message: "Signup successful", student: newStudent });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { signupContoller };
