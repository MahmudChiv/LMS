import express, {Request, Response, Router} from "express";

import { body, validationResult } from "express-validator";

const router: Router = express.Router();

router.post("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Login successful" });
});

export default router;