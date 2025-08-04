import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private getLocationBySensorId(sensor_id: string): string {
    const locations = {
      "1": "Living Room",
      "2": "Bedroom",
      "3": "Kitchen",
		}

    return locations[sensor_id] || "Unknown";
  }

  private getSensorIdByLocation(location: string): string {
    const ids = {
      "Living Room": "1",
      Bedroom: "2",
      Kitchen: "3",
    }

    return ids[location] || "0";
  }

  getRandomTemperature(location: string, sensor_id: string): any {
    if (!location && !sensor_id) {
      return {};
    }

    let currentLocation = location;
    let sensorId = sensor_id;

    if (!currentLocation) {
      currentLocation = this.getLocationBySensorId(sensorId);
    }

    if (!sensorId) {
      sensorId = this.getSensorIdByLocation(location);
    }

    return {
      location: currentLocation,
      value: Math.ceil(Math.random() * (30 - -30) + -30),
      unit: 'C',
      status: Math.random() > 0.5 ? 'active' : 'deactivated',
      timestamp: new Date(),
      description: `Информация о локации ${currentLocation}`,
      sensor_id: sensorId,
      sensor_type: `Датчик №${sensorId}`
    }
  }
}
