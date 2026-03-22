import express from "express";
import type { Router, Request, Response } from "express";
import { signupValidation } from "../middleware/validation";
import authContoller from "../controllers/authContoller";

const router: Router = express.Router();

router.post("/", signupValidation, authContoller.signupContoller);

export default router;
