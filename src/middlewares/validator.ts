import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator'
import {handleError, ErrorHandler} from  '../error'

// =============================
// @desc      interecepta el request y recorre las validaciones que se le hayan aplicado
// =============================
const validationsHandler = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const err = new ErrorHandler(400, 'Invalid Field');
  handleError(err, req, res);
};

export default validationsHandler;