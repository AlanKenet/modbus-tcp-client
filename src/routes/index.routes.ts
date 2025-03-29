import { Router } from 'express'

import { index, ping } from '../controllers/index.controller'

const indexRoutes = Router()

indexRoutes.get('/', index)

indexRoutes.get('/ping', ping)

export default indexRoutes
