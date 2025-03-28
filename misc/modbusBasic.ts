import Modbus from 'modbus-serial'
const client = new Modbus()

// Configuración del PLC (ajusta estos valores)
const PLC_IP = '192.168.1.10' // IP del PLC
const PLC_PORT = 502 // Puerto Modbus TCP (usualmente 502)
const UNIT_ID = 1 // ID de unidad Modbus
const REGISTER_ADDRESS = 0 // Dirección del registro a leer

let previousValue: any = null
let isConnected = false

// Función para conectar/reconectar
async function connect (): Promise<void> {
  try {
    await client.connectTCP(PLC_IP, { port: PLC_PORT })
    client.setID(UNIT_ID)
    isConnected = true
    console.log('Conectado al PLC')
  } catch (err: any) {
    console.error('Error de conexión:', err.message)
    isConnected = false
    setTimeout(connect, 5000) // Reintenta cada 5 segundos
  }
}

// Lectura continua con detección de cambios
async function readRegister (): Promise<void> {
  if (!isConnected) return

  try {
    const data = await client.readHoldingRegisters(REGISTER_ADDRESS, 1)
    const currentValue = data.data[0]

    if (previousValue !== null && currentValue !== previousValue) {
      console.log(`Registro ${REGISTER_ADDRESS} cambiado:`, {
        valorAnterior: previousValue,
        valorNuevo: currentValue,
        timestamp: new Date().toISOString()
      })
    }

    previousValue = currentValue
  } catch (err: any) {
    console.error('Error de lectura:', err.message)
    isConnected = false
    await connect() // Intenta reconectar
  }
}

// Inicio
connect()
setInterval(readRegister, 300) // Ajusta el intervalo (300ms ejemplo)
