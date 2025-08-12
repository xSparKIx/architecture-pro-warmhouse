import { Injectable } from "@nestjs/common";
import { CreateTelemetryDto } from "./dto/create-telemetry.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Telemetry } from "./entities/telemetry.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class TelemetryService {
    constructor(@InjectRepository(Telemetry) private readonly telemetryRepository: Repository<Telemetry>) {}

    /**
     * Метод записи телеметрии
     * @param createTelemetryDto Данные телеметрии 
     */
    create(createTelemetryDto: CreateTelemetryDto) {
        const data = this.telemetryRepository.create(createTelemetryDto);
        return this.telemetryRepository.save(data);
    }

    /**
     * Метод получения последней телеметрии по uuid устройства
     */
    getByDeviceId(deviceId: string) {
        return this.telemetryRepository.findOne({
            where: { deviceId },
            order: { createdAt: 'desc' },
        })
    }

    /**
     * Метод получения телеметрии
     */
    getByDeviceIds(deviceIds: string[] = []) {
        return this.telemetryRepository
            .createQueryBuilder('telemetry')
            .distinctOn(['telemetry.deviceId'])
            .where('telemetry.deviceId IN (:...deviceIds)', { deviceIds })
            .orderBy('telemetry.deviceId')
            .addOrderBy('telemetry.createdAt', 'DESC')
            .getMany();
    }
}