import express, { Request, Response, Router } from "express";
import { signupValidation, LoginValidation } from "../middleware/validation";
import { body, validationResult } from "express-validator";
import { signupContoller, loginController } from "../controllers/authContoller";
import passport from "passport";
import { configurePassport } from "../config/passport";
configurePassport(passport);

const router: Router = express.Router();

router.post("/signUp", signupValidation, signupContoller);
router.post(
  "/login",
  LoginValidation,
  loginController
);

export default router;
