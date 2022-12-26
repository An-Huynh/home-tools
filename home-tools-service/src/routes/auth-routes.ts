import express, { Router } from "express";
import { login, refresh } from "../controllers/auth/auth-controller";
import { loginCredentialSchema } from "../validators";
import { joiValidation } from "../middleware/validation";
import passport from "passport";

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
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
authRouter.post("/login", joiValidation(loginCredentialSchema), login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Get new set of access and refresh tokens.
 *     description: Returns a new set of access and refresh token if the
 *                  call is authenticated with an existing refresh token.
 *     tags:
 *     - Auth
 *     responses:
 *       200:
 *         description: Successful authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
authRouter.post(
  "/refresh",
  passport.authenticate("refresh-token", {
    session: false,
    failWithError: true,
  }),
  refresh
);

export { authRouter };
