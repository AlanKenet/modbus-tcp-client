import ModbusRTU from 'modbus-serial'
import { ModbusTcpService } from '@/services/modbus/modbusTcp.service'

jest.mock('modbus-serial')

describe('ModbusTcpService', () => {
  const mockConfig = { ip: '192.168.1.100', port: 502 }
  let service: ModbusTcpService

  beforeEach(() => {
    jest.clearAllMocks()
    service = new ModbusTcpService(mockConfig)
  })

  test('debería crear instancia con configuración correcta', () => {
    expect(service.ip).toBe('192.168.1.100')
    expect(service.port).toBe(502)
  })

  test('debería instanciar cliente Modbus', () => {
    expect(ModbusRTU).toHaveBeenCalledTimes(1)
  })
})
