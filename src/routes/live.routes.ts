import { Router } from 'express'

import { index, chat } from '../controllers/live.controller'

const liveRoutes = Router()

liveRoutes.get('/live', index)

liveRoutes.get('/live/chat', chat)

export default liveRoutes
