import { Router } from 'express'

import { index, chat, monitor } from '../controllers/live.controller'

const liveRoutes = Router()

liveRoutes.get('/live', index)

liveRoutes.get('/live/chat', chat)

liveRoutes.get('/live/monitor', monitor)

export default liveRoutes
