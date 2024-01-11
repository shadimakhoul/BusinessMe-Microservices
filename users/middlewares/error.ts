import { Request, Response, NextFunction  } from 'express';
import { ErrorHandler } from "../utils/errorHandler";
import { badRequest } from '../instance';

type CustomError = {
    statusCode: number;
    message?: string;
    name?: string;
    path?: string;
    code?: number;
    keyValue?: any;
    // Add more properties as necessary
};


export default (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error1";
  
  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === badRequest) {
    const message = `${badRequest}. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;    
    err = new ErrorHandler(message, 409);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 401);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 403);
  }
  
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};