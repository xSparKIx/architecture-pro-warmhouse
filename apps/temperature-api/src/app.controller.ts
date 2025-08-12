import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Контроллер температуры в локации
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/temperature')
  getTemperature(@Query('location') location: string, @Query('sensor_id') sensor_id: string): any {
    if (!location && !sensor_id) {
      throw new BadRequestException('Не передана локация и датчик');
    }

    return this.appService.getRandomTemperature(location, sensor_id);
  }
}
