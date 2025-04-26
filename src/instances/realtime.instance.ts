import { RealtimeService } from '../services/realtime/realtime.service'
import { namespaces } from '../sockets/realtime/channel.const'
import { Server } from 'http'

let instance: RealtimeService | null = null

export const initRealtimeService = (server: Server): RealtimeService => {
  if (instance == null) {
    instance = RealtimeService.getInstance(server)
    instance.initChannels(namespaces)
  }
  return instance
}

export const getRealtimeService = (): RealtimeService => {
  if (instance == null) throw new Error('RealtimeService not initialized')
  return instance
}
