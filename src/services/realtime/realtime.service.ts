import { Server } from 'socket.io'
import { Server as Serverhttp } from 'http'

import { SocketIONamespaceDefinition } from '../../sockets/realtime/channel.types'
import { SocketChannel } from '../../sockets/realtime/channel.socket'

export class RealtimeService {
  private static instance: RealtimeService
  private readonly io: Server
  private channels: SocketChannel[]
  constructor (server: Serverhttp) {
    this.io = new Server(server)
    this.channels = []
  }

  static getInstance (server?: Serverhttp): RealtimeService {
    if (RealtimeService.instance === undefined) {
      if (server === undefined) {
        throw new Error('Server instance must be provided on first initialization')
      }
      RealtimeService.instance = new RealtimeService(server)
    }
    return RealtimeService.instance
  }

  initChannels (namespaces: SocketIONamespaceDefinition[]): void {
    this.channels = namespaces.map((namespace: SocketIONamespaceDefinition) => {
      const channel = new SocketChannel({ io: this.io, ...namespace })
      return channel
    })
  }

  getChannelList (): SocketChannel[] {
    return this.channels
  }
}
