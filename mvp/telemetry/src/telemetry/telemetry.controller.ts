import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
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

    /**
     * Метод получения последней телеметрии по UUID устройства
     */
    @Get('/last/:deviceId')
    getByDeviceId(@Param('deviceId') deviceId: string) {
        return this.telemetryService.getByDeviceId(deviceId);
    }

    /**
     * Метод получения последней телеметрии по uuid устройств
     */
    @Post("/last")
    @HttpCode(200)
    get(@Body() options: Record<string, any>) {
        const ids = options.id || [];
        return this.telemetryService.getByDeviceIds(ids);
    }
}