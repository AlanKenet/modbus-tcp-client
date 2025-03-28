import { ModbusTcpService } from './services/modbus/modbusTcp.service'

const modbusClient = new ModbusTcpService({ ip: '192.168.100.30', port: 502 })

async function main (): Promise<void> {
  try {
    await modbusClient.connect()
    setInterval(async () => {
      try {
        await modbusClient.readCoils({ addresses: [512, 513, 514, 515] })
        console.log('----------')
      } catch (err: any) {
        console.error('Error en lectura periódica:', err)
      }
    }, 1000)
  } catch (err) {
    console.error('Error inicial:', err)
    process.exit(1)
  }
}

main().catch(console.error)
