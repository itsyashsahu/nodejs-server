import { NextFunction, Request, Response } from "express";

import ErrorResponse from "../interfaces/ErrorResponse";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = {
    success: false,
    message: "404 Not found"
  }
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: ErrorResponse,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const responseBody = {
    success: err.success,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  };

  console.error("Error: ", responseBody);
  res.json(responseBody);
}
