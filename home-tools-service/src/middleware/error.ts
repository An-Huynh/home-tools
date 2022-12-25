import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { status, ...error } = err;
  res.status(status || 500).json(error);
}
