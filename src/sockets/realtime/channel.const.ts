import { SocketIONamespaceDefinition } from './channel.types'

export const namespaces: SocketIONamespaceDefinition[] = [
  {
    name: 'Monitor',
    identifier: '/live/monitor'
  }
]
