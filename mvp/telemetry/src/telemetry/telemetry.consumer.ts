import { Controller } from "@nestjs/common";
import { TelemetryService } from "./telemetry.service";
import { EventPattern } from "@nestjs/microservices";
import { CreateTelemetryDto } from "./dto/create-telemetry.dto";

/**
 * Consumer телеметрии
 */
@Controller()
export class TelemetryConsumer {
    constructor(private readonly telemetryService: TelemetryService) {}

    /**
     * Обработка получения телеметрии
     * @param data Данные о телеметрии
     */
    @EventPattern('telemetry_created')
    handleCreateTelemetry(data: any) {
        if (Array.isArray(data)) {
            data.forEach(d => {
                this.telemetryService.create(d);       
            });
        } else {
            this.telemetryService.create(data);
        }
    }
}