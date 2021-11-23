import { NextFunction, Request, Response } from 'express';

export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
    const message = 'Something went wrong';
    res.status(500).json(message);
    
};
