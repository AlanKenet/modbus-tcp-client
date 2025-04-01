import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

import { configureSocketIO, namespaces } from './configs/socketIO.config'

import { config } from './configs/env.config'

import indexRoutes from './routes/index.routes'
import liveRoutes from './routes/live.routes'

import { notFoundMiddleware } from './middleware/notFound.middleware'

import { SocketIONamespaceDefinition } from './sockets/channel.types'
import { SocketChannel } from './sockets/channel.socket'

const app = express()
const server = http.createServer(app)

app.use(express.json())

app.use(indexRoutes)
app.use(liveRoutes)

app.use(notFoundMiddleware)

const io: Server = configureSocketIO(server)

const channels: SocketChannel[] = namespaces.map((namespace: SocketIONamespaceDefinition) => {
  const channel = new SocketChannel({ io, ...namespace })
  return channel
})

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
