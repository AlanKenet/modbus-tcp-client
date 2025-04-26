import { Namespace, Server, Socket } from 'socket.io'

export class SocketChannel {
  private readonly socketIO: Server
  private readonly name: string
  private readonly identifier: string
  private readonly namespace: Namespace
  private readonly connectedClients: Set<Socket> = new Set()

  constructor ({ io, name, identifier }: { io: Server, name: string, identifier: string }) {
    this.name = name
    this.identifier = identifier
    this.socketIO = io
    this.namespace = this.socketIO.of(this.identifier)
  }

  initConnectionHandler (): void {
    this.namespace.on('connection', (socket: Socket) => {
      this.handleNewConnection(socket)

      socket.on('disconnect', () => {
        this.handleDisconnection(socket)
      })
    })
  }

  private handleNewConnection (socket: Socket): void {
    this.connectedClients.add(socket)
    console.log(`|${this.name}| New connection: ${socket.id}`)
  }

  private handleDisconnection (socket: Socket): void {
    this.connectedClients.delete(socket)
    console.log(`|${this.name}| Disconnection: ${socket.id}`)
  }

  emitToChannel<T>({ topic, message }: { topic: string, message: T }): void {
    this.namespace.emit(topic, message)
  }

  emitToClient<T>({ client, topic, message }: { client: Socket, topic: string, message: T }): void {
    client.emit(topic, message)
  }
}
