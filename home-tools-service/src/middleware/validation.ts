import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";

export function joiValidation(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(
      {
        params: req.params,
        query: req.query,
        body: req.body,
      },
      {
        abortEarly: false,
        allowUnknown: true,
      }
    );
    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({ messages });
    } else {
      next();
    }
  };
}
