export interface ModbusServiceInterface {
  ip: string
  port: number
  connect: () => void
  disconnect: () => void
  readCoil: (address: number) => Promise<void>
  readCoils: ({ addresses, range }: { addresses?: number[], range?: number[] }) => Promise<void>
  writeData: (data: any) => void
}
