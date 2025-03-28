export interface ModbusServiceInterface {
  ip: string
  port: number
  connect: () => void
  disconnect: () => void
  readData: (adress: number) => Promise<void>
  writeData: (data: any) => void
}
