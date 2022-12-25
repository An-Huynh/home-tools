import { Request, Response, NextFunction } from "express";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user?.id !== req.params.id) {
      return next({
        status: 403,
        message: `Client does not have permission to get user with ID "${req.params.id}"`,
      });
    }

    // Removing fields that clients don't really need to care about.
    // From a client respective, A User is just the "id", "name",
    // and "email".
    // Additionally, since the auth flow will set the user field in
    // request for any authenticated route, we already have
    // a user available and can just return that instead.
    const { updatedAt, createdAt, password, ...user } = req.user;

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}
