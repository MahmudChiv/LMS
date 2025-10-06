import { Request, Response } from "express";
import { Student, Gender } from "../models/Student";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

interface SignupRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: Gender;
}

interface LoginRequestBody {
  email: string;
  password: string;
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
    const userExist = await Student.findOne({
      where: { email: req.body.email },
    });

    if (userExist) {
      res.status(400).json({msg: "A user with the email already exist"})
    }
    
    const { firstName, lastName, email, password, dateOfBirth, gender } =
      req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newStudent = await Student.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
    });
    res.status(200).json({ message: "Signup successful", student: newStudent });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Unable to signup" });
  }
};

const loginController = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
  } catch (error) {}
};

export default { signupContoller };
