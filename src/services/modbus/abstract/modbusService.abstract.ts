import { ModbusServiceInterface } from '../interfaces/modbusService.interface'
import { ModbusConfig } from '../interfaces/modbusConfig.interface'

export abstract class ModbusService implements ModbusServiceInterface {
  ip: string
  port: number
  constructor ({ ip = '127.0.0.1', port = 502 }: ModbusConfig) {
    this.ip = ip
    this.port = port
  }

  abstract connect (): void
  abstract disconnect (): void
  abstract readCoil (adress: number): Promise<void>
  abstract readCoils ({ addresses, range }: { addresses?: number[], range?: number[] }): Promise<void>
  abstract writeData (data: any): void
}
