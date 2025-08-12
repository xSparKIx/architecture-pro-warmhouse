import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Telemetry } from "./entities/telemetry.entity";
import { TelemetryGetController } from "./telemetry-get.controller";
import { TelemetryGetService } from "./telemetry-get.service";
import { KafkaModule } from "src/common/kafka.module";
import { TelemetryController } from "./telemetry.controller";
import { TelemetryConsumer } from "./telemetry.consumer";
import { TelemetryService } from "./telemetry.service";

@Module({
    imports: [
        KafkaModule,
        TypeOrmModule.forFeature([Telemetry]),
    ],
    controllers: [
        TelemetryController,
        TelemetryConsumer,
        TelemetryGetController,
    ],
    providers: [TelemetryService, TelemetryGetService],
    exports: [TelemetryService, TelemetryGetService],
})
export class TelemetryModule {}