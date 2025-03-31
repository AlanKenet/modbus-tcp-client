import express from 'express'
import http from 'http'
import { setUpSocketIo } from './sockets/index.socket'

import { config } from './configs/env.config'

import indexRoutes from './routes/index.routes'
import liveRoutes from './routes/live.routes'
import { notFoundMiddleware } from './middleware/notFound.middleware'

const app = express()
const server = http.createServer(app)

app.use(express.json())

app.use(indexRoutes)
app.use(liveRoutes)

app.use(notFoundMiddleware)

setUpSocketIo(server)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
