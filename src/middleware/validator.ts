import { Request, Response, NextFunction } from "express";

interface RequestBody {
  [key: string]: any;
}

class RequestValidator {
  private reqBody: RequestBody;

  constructor(reqBody: RequestBody) {
    this.reqBody = reqBody;
  }

  public validateFields(
    requiredFields: string[]
  ): Record<string, string> | null {
    const errors: Record<string, string> = {};

    requiredFields.forEach((field: string) => {
      if (!this.reqBody[field]) {
        errors[field] = `${field} is required`;
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }
}

// Middleware for validation
const validateRequest = (fields: string[]): any => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const validator = new RequestValidator(req.body);
    const boundValidate = validator.validateFields.bind(validator);
    const errors = boundValidate(fields);

    if (errors) {
      return res.status(400).json({ errors });
    }

    next();
  };
};

export default validateRequest;
