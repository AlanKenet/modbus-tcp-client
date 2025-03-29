import ModbusRTU from 'modbus-serial'

import { ModbusConfig } from './interfaces/modbusConfig.interface'
import { ModbusService } from './abstract/modbusService.abstract'

export class ModbusTcpService extends ModbusService {
  private readonly modbusClient: ModbusRTU
  private isConnected: boolean = false

  constructor ({ ip, port }: ModbusConfig) {
    super({ ip, port })
    this.modbusClient = new ModbusRTU()
  }

  async connect (): Promise<void> {
    try {
      console.log(`connecting to ${this.ip} on ${this.port} port`)
      await this.modbusClient.connectTCP(this.ip, { port: this.port })
    } catch (err: any) {
      this.isConnected = false
      console.error(err.message)
    } finally {
      this.isConnected = true
      console.log('Connected')
    }
  }

  async readCoil (address: number): Promise<void> {
    try {
      if (!this.isConnected) throw new Error('No connection')

      const data = await this.modbusClient.readCoils(address, 1)
      const currentValue = data.data[0]
      console.log(currentValue)
    } catch (err: any) {
      console.error('Error de lectura:', err.message)
      this.isConnected = false
      console.log('Trying to reconnect')
      await this.connect()
    }
  }

  async readCoils ({ addresses, range }: { addresses?: number[], range?: number[] }): Promise<void> {
    try {
      if (!this.isConnected) {
        throw new Error('No connection')
      }
      if (addresses != null) {
        const data: Boolean[] = await Promise.all(addresses.map(async address => {
          const currentValue = await this.modbusClient.readCoils(address, 1)
          return currentValue.data[0]
        }))
        console.log(data)
      }
      if (range != null) {
        const data: Boolean[] = (await this.modbusClient.readCoils(range[0], range.length)).data
        console.log(data)
      }
    } catch (err: any) {
      console.error('Error de lectura:', err.message)
      this.isConnected = false
      console.log('Trying to reconnect')
      await this.connect()
    }
  }

  disconnect (): void {
    console.log('deconectando')
  }

  writeData (data: any): void {
    console.log('Escribiendo')
  }

  getIsConnected (): Boolean {
    return this.isConnected
  }
}
