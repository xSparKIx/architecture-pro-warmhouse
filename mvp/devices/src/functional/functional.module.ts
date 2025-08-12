import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Functionality } from "./entities/functionality.entity";
import { FunctionalController } from "./functional.controller";
import { FunctionalService } from "./functional.service";
import { FunctionalConsumer } from "./functional.consumer";
import { KafkaModule } from "src/common/kafka.module";

@Module({
  imports: [KafkaModule, TypeOrmModule.forFeature([Functionality])],
  controllers: [FunctionalController, FunctionalConsumer],
  providers: [FunctionalService],
  exports: [FunctionalService],
})
export class FunctionalModule {}