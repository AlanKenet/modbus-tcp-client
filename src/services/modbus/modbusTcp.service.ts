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

  async readData (adress: number): Promise<void> {
    if (this.isConnected) {
      try {
        const data = await this.modbusClient.readCoils(adress, 1)
        const currentValue = data.data[0]
        console.log(currentValue)
      } catch (err: any) {
        console.error('Error de lectura:', err.message)
        this.isConnected = false
        await this.connect() // Intenta reconectar
      }
    }
  }

  disconnect (): void {
    console.log('deconectando')
  }

  writeData (data: any): void {
    console.log('Escribiendo')
  }
}
