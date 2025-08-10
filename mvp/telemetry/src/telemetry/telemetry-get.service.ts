import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

/**
 * Сервис сбора телеметрии
 */
@Injectable()
export class TelemetryGetService {
  constructor(@Inject('TELEMETRY_SERVICE') private readonly kafkaClient: ClientKafka) {}

  /**
   * Метод получения телеметрии
   * @param location Локация
   */
  async getTelemetry(location: string): Promise<any> {
    const data = [{
      deviceId: 'e33d9f01-6d25-4dcd-8197-0938350aadf7',
      // Данные телеметрии
      data: {
        temperature: Math.ceil(Math.random() * (30 - -30) + -30),
      },
      location,
    }];

    // Отправляем полученные данные
    this.kafkaClient.emit('telemetry_created', data);

    return data;
  }

  /**
   * Метод получения последней телеметрии по определенному устройству
   * @param deviceId UUID устройства для получения телеметрии
   * @returns Данные о телеметрии устройства
   */
  async getLastDeviceTelemetry(deviceId: string): Promise<any> {
    // Эмитируем получение данных
    const data = {
      deviceId,
      // Данные телеметрии
      data: {
        temperature: Math.ceil(Math.random() * (30 - -30) + -30),
      },
    };

    // Отправляем полученные данные
    this.kafkaClient.emit('telemetry_created', data);

    return data;
  }
}