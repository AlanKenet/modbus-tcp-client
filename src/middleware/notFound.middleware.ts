import { Request, Response, NextFunction } from 'express'

export const notFoundMiddleware = (_req: Request, res: Response, _next: NextFunction): any => {
  res.status(404).json({
    message: 'Endpoint not found'
  })
}
