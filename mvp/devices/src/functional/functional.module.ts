import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Functionality } from "./entities/functionality.entity";
import { FunctionalController } from "./functional.controller";
import { FunctionalService } from "./functional.service";

@Module({
  imports: [TypeOrmModule.forFeature([Functionality])],
  controllers: [FunctionalController],
  providers: [FunctionalService],
  exports: [FunctionalService],
})
export class FunctionalModule {}