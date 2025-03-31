import { Server } from 'socket.io'

export const setUpSocketIo: any = (server: any) => {
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('New connection')

    socket.on('clientMessage', (data) => {
      console.log('Received message from client:', data)

      socket.emit('serverMessage', 'Message received!')
      io.emit('chatMessage', data)
    })

    socket.on('disconnect', () => {
      console.log('Disconnection')
    })
  })

  return io
}
