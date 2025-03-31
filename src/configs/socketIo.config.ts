import { Server } from 'socket.io'

import { SocketIONamespaceDefinition } from '../sockets/channel.types'

export const configureSocketIO: any = (server: any) => {
  const io = new Server(server)

  return io
}

export const namespaces: SocketIONamespaceDefinition[] = [
  {
    name: 'Monitor',
    identifier: '/live/monitor'
  }
]
