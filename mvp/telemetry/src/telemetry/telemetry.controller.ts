import { Body, Controller, Post } from "@nestjs/common";
import { CreateTelemetryDto } from "./dto/create-telemetry.dto";
import { TelemetryService } from "./telemetry.service";

/**
 * Контроллер управления телеметрией
 */
@Controller('telemetry')
export class TelemetryController {
    constructor(private readonly telemetryService: TelemetryService) {}

    /**
     * Метод создания телеметрии
     */
    @Post()
    create(@Body() createTelemetryDto: CreateTelemetryDto) {
        return this.telemetryService.create(createTelemetryDto);
    }
}