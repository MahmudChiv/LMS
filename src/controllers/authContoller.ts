import { Request, Response } from "express";
import { Student } from "../models/Student";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { SignupRequestBody, LoginRequestBody } from "../types/auth.interface";
import { issueJWT } from "../../utils/tokenIssuer";

export const signupContoller = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, password, dateOfBirth, gender } =
      req.body;

    const userExist = await Student.findOne({
      where: { email },
    });

    if (userExist) {
      return res.status(400).json({ msg: "A user with the email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await Student.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
    });
    res
      .status(201)
      .json({
        message: "Signup successful",
        student: [firstName, lastName, email, dateOfBirth, gender],
      });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Unable to signup" });
  }
};

export const loginController = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect password bro 🧐" });
    }

    const jwt = issueJWT(student);
    return res
      .status(200)
      .json({
        message: "Login successful",
        token: jwt.token,
        expiresIn: jwt.expires,
      });
  } catch (error) {}
};
