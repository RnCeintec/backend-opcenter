import { NextFunction, Request, Response } from 'express';
import { DeepTrim } from '../utils';

export default (req: Request, _: Response, next: NextFunction) => {
  DeepTrim(req.query);
  DeepTrim(req.body);
  DeepTrim(req.params);
  next();
};
