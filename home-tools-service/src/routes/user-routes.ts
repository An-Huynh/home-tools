import express, { Router } from "express";
import { joiValidation } from "../middleware/validation";
import { getUserRequestSchema } from "../validators/user-validators";
import { getUser } from "../controllers/user/user-controller";
import passport from "passport";

const userRouter: Router = express.Router();

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a User.
 *     description: Get a specific user identified by id provided in url.
 *                  A request can only be made for a user if the requester
 *                  has a JWT token associated with the requested user.
 *                  An authenticated user cannot request the user data
 *                  for another user.
 *     tags:
 *     - User
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       description: ID of the requested user.
 *       required: true
 *     responses:
 *       200:
 *         description: Successful authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 emailAddress:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
userRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  joiValidation(getUserRequestSchema),
  getUser
);

export { userRouter };
