import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function checkSchemaValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, errors: errors.array() });
  } else {
    return next();
  }
}
