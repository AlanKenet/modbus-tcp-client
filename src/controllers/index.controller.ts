import { Request, Response } from 'express'
import path from 'path'

export const ping = (_req: Request, res: Response): any => res.send('Pong')

export const index = (_req: Request, res: Response): any => res.sendFile(path.resolve(__dirname, '../resources/views/index.html'))
