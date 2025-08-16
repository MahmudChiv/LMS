import express from "express";
import { body, validationResult } from "express-validator";
import type { Router, Request, Response } from "express";

// Define the expected shape of req.body
interface SignupRequestBody {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  studentId: string;
}

const router: Router = express.Router();

// Validation middleware array
const signupValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),
  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid ISO 8601 date"),
  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be either male, female, or other"),
  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required")
    .isAlphanumeric()
    .withMessage("Student ID must be alphanumeric"),
];

router.post("/", signupValidation, (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, dateOfBirth, gender, studentId } = req.body;

  res.status(200).json({ message: "Signup successful" });
}
);

export default router;





// {
//   "watch": ["*.ts", "routes/*.ts"],
//   "ext": "ts",
//   "exec": "ts-node --transpile-only server.ts"
// }