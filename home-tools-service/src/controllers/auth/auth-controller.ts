import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({ message: info.message, status: 401 });
      }
      req.login(user, { session: false }, async (err) => {
        if (err) {
          return next(err);
        }
        const body = {
          id: user.id,
          name: user.name,
          emailAddress: user.emailAddress,
        };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET!, {
          expiresIn: "5m",
        });
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
}
