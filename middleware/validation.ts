import express from "express";
import { body} from "express-validator";

// Validation middleware array

export const signupValidation = [
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

