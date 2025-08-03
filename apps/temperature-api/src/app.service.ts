import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRandomTemperature(): number {
    return Math.ceil(Math.random() * (30 - -30) + -30);
  }
}
