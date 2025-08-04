import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Контроллер температуры в локации
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/temperature')
  getTemperature(@Query('location') location: string): number {
    if (!location) {
      throw new BadRequestException('Не передана локация');
    }

    return this.appService.getRandomTemperature(location);
  }
}
