import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt, { SignOptions } from "jsonwebtoken";

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
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        return res.json({ accessToken, refreshToken });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
}

function generateAccessToken(userId: string): string {
  const payload = { userId };
  const configuration: SignOptions = { expiresIn: "5m" };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, configuration);
}

function generateRefreshToken(userId: string): string {
  const payload = { userId };
  const configuration: SignOptions = { expiresIn: "14d" };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, configuration);
}
