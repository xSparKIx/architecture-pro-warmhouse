import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { FunctionalService } from "./functional.service";

/**
 * Consumer функций устройств
 */
@Controller()
export class FunctionalConsumer {
    constructor(private readonly functionalService: FunctionalService) {}

    /**
     * Обработка запущенной команды устройства
     * @param id UUID выполняемой команды
     */
    @EventPattern('command_exec')
    handleCommand(id: string) {
        this.functionalService.executeCommand(id)
    }
}