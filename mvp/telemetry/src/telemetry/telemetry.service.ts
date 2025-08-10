import { Injectable } from "@nestjs/common";
import { CreateTelemetryDto } from "./dto/create-telemetry.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Telemetry } from "./entities/telemetry.entity";
import { Repository } from "typeorm";

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
}