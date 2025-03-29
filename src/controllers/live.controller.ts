import { Request, Response } from 'express'
import path from 'path'

export const index = (_req: Request, res: Response): any => res.sendFile(path.resolve(__dirname, '../resources/views/live/live.html'))

export const chat = (_req: Request, res: Response): any => res.sendFile(path.resolve(__dirname, '../resources/views/live/chat.html'))
