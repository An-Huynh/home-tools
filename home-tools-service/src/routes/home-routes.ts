import express, { Router } from "express";
import {
  addHome,
  deleteHome,
  getHomes,
  updateHome,
} from "../controllers/home/home-controller";
import passport from "passport";
import {
  addHomeRequestSchema,
  updateHomeRequestSchema,
  getHomeRequestSchema,
  deleteHomeRequestSchema,
} from "../validators";
import { joiValidation } from "../middleware/validation";

const homeRouter: Router = express.Router();

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Retrieve a paginated list of Homes.
 *     description: Retrieve a list of homes based filtered and paginated
 *                  based on query parameters. The ownerId parameter must
 *                  match the identify of the client making the request as
 *                  only have access to their own home data.
 *     tags:
 *     - Home
 *     parameters:
 *     - in: query
 *       name: ownerId
 *       schema:
 *         type: string
 *       description: ID of the requested home
 *       required: true
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *       description: Page of the paginated response.
 *       required: true
 *     - in: query
 *       name: pageSize
 *       schema:
 *         type: integer
 *       description: Number of homes in the paginated response.
 *       required: true
 *     responses:
 *       200:
 *         description: Successful request for homes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 homes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       ownerId:
 *                         type: string
 *                 count:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
homeRouter.get(
  "/",
  passport.authenticate("access-token", {
    session: false,
    failWithError: true,
  }),
  joiValidation(getHomeRequestSchema),
  getHomes
);

/**
 * @swagger
 * /home:
 *   post:
 *     summary: Create a home.
 *     description: Create a home. The ownerId must match the user making
 *                  the request as a user cannot make a home for another user,
 *                  only themselves.
 *     tags:
 *     - Home
 *     requestBody:
 *       description: Home details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ownerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created home.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 ownerId:
 *                   type: string
 *                 id:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
homeRouter.post(
  "/",
  passport.authenticate("access-token", {
    session: false,
    failWithError: true,
  }),
  joiValidation(addHomeRequestSchema),
  addHome
);

/**
 * @swagger
 * /home/{id}:
 *   delete:
 *     summary: Delete a home.
 *     description: Deletes a home specified via the id parameter in the URL. The caller
 *                  must be the owner of the home in order for the delete to succeed.
 *     tags:
 *     - Home
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: ID (UUID) of home.
 *     responses:
 *       204:
 *         description: Successfully deleted home.
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
homeRouter.delete(
  "/:id",
  passport.authenticate("access-token", {
    session: false,
    failWithError: true,
  }),
  joiValidation(deleteHomeRequestSchema),
  deleteHome
);

/**
 * @swagger
 * /home/{id}:
 *   put:
 *     summary: Update a home.
 *     description: Update a home. The ownerId must match the user making
 *                  the request as a user currently cannot change the owner
 *                  to another user.
 *     tags:
 *     - Home
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: ID (UUID) of home.
 *     requestBody:
 *       description: Home details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ownerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated home.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 ownerId:
 *                   type: string
 *                 id:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
homeRouter.put(
  "/:id",
  passport.authenticate("access-token", {
    session: false,
    failWithError: true,
  }),
  joiValidation(updateHomeRequestSchema),
  updateHome
);

export { homeRouter };
