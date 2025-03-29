import { Request, Response } from 'express'

export const ping = (_req: Request, res: Response): any => res.send('Pong')

export const index = (_req: Request, res: Response): any => res.send('Bienvenido')
