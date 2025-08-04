import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRandomTemperature(location: string): any {
    return {
      location,
      value: Math.ceil(Math.random() * (30 - -30) + -30),
      unit: 'C',
      status: Math.random() > 0.5 ? 'active' : 'deactivated',
      timestamp: new Date(),
      description: `Информация о локации ${location}`,
      sensor_id: Math.ceil(Math.random() * (100000 - 999999) + 999999).toString(),
      sensor_type: 'Тестовый датчик'
    }
  }
}
