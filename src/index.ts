import express from 'express'
import http from 'http'

import { config } from './configs/env.config'

import indexRoutes from './routes/index.routes'
import liveRoutes from './routes/live.routes'

import { notFoundMiddleware } from './middleware/notFound.middleware'

import { initRealtimeService } from './instances/realtime.instance'

const app = express()
const server = http.createServer(app)

app.use(express.json())

app.use(indexRoutes)
app.use(liveRoutes)

app.use(notFoundMiddleware)

initRealtimeService(server)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
