import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, _res: Response, next: NextFunction) => {
    console.log("Requested: " + req.url);
    next();
}
