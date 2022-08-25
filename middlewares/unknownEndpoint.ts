import { Request, Response, NextFunction } from 'express';

const unknownEndpoint = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: 'Unknown Endpoint' });
};

export default unknownEndpoint;
