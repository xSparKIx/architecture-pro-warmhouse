import { Controller, Get, Post } from "@nestjs/common";
import { FunctionalService } from "./functional.service";
import { EventPattern } from "@nestjs/microservices";

@Controller('functional')
export class FunctionalController {
    constructor(private readonly functionalService: FunctionalService) {}

    @Post('execute')
    execute() {
        this.functionalService.executeCommand('test123')
    }

    @EventPattern('command_exec')
    handleCommand(data) {
        this.functionalService.executeCommand(data)
    }
}