import { ApiError } from './utils.js';  // Importing ApiError from utils.js

// Global Error Handler
const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    // If it's an instance of ApiError, return the structured error response
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  // For general errors, send a generic error response
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export { errorHandler };
