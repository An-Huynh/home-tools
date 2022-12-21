import express, { Router } from "express";
import { login } from "../controllers/auth/auth-controller";

const authRouter: Router = express.Router();

authRouter.post("/login", login);

export { authRouter };
