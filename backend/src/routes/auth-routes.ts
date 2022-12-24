import express, { Router } from "express";
import { login } from "../controllers/auth/auth-controller";
import { checkSchemaValidation } from "../middleware/validation";
import { loginCredentialValidator } from "../validators";

const authRouter: Router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate the caller with login credentials.
 *     description: Authenticates the caller with a username and password
 *                  and returns a JWT the caller can use to authenticate
 *                  calls to other endpoints.
 *     tags:
 *     - Auth
 *     requestBody:
 *       description: Login credential
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwt:
 *                   type: string
 *                   description: JWT to authenticate calls
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
authRouter.post(
  "/login",
  loginCredentialValidator,
  checkSchemaValidation,
  login
);

export { authRouter };
