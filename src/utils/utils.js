// ApiError Class: Custom error class to handle errors in a structured way
class ApiError extends Error {
  constructor(
      statusCode,
      message = "Something went wrong",
      errors = [],
      stack = ""
  ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false;
      this.errors = errors;

      if (stack) {
          this.stack = stack;
      } else {
          Error.captureStackTrace(this, this.constructor);
      }
  }
}

// ApiResponse Class: Standardized response format for successful operations
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400;
  }
}

// Async Handler: A wrapper for async functions to handle errors in one place
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// Export utilities
export { ApiError, ApiResponse, asyncHandler };
