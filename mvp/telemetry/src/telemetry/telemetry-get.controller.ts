import { Controller, Get, Param, Query } from '@nestjs/common';
import { TelemetryGetService } from './telemetry-get.service';

/**
 * Контроллер получения телеметрии от устройств
 */
@Controller('get-telemetry')
export class TelemetryGetController {
  constructor(private readonly telemetryService: TelemetryGetService) {}

  /**
   * Метод получения телеметрии по локации
   * @param location Локация
   */
  @Get()
  getTelemetry(@Query('location') location: string) {
    return this.telemetryService.getTelemetry(location);
  }

  /**
   * Метод получения телеметрии определенного устройства
   * @param deviceId UUID устройства для получения телеметрии
   * @returns 
   */
  @Get(':deviceId')
  getDeviceTelemetry(@Param('deviceId') deviceId: string) {
    return this.telemetryService.getLastDeviceTelemetry(deviceId);
  }
}