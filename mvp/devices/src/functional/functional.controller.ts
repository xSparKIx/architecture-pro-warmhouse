import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FunctionalService } from "./functional.service";
import { CreateFunctionalDto } from "./dto/create-functional.dto";
import { UpdateFunctionalDto } from "./dto/update-functional.dto";

/**
 * Контроллер функционала устройств
 */
@Controller('functional')
export class FunctionalController {
    constructor(private readonly functionalService: FunctionalService) {}

    /**
     * Создание функции устройства
     * @param createFunctionalDto Данные для создания
     * @returns 
     */
    @Post()
    create(@Body() createFunctionalDto: CreateFunctionalDto) {
        return this.functionalService.create(createFunctionalDto);
    }

    /**
     * Обновление функционала устройства
     * @param id UUID обновляемой функции
     * @param updateFunctionalDto Данные для обновления
     * @returns 
     */
    @Put(":id")
    update(@Param('id') id: string, @Body() updateFunctionalDto: UpdateFunctionalDto) {
        return this.functionalService.update(id, updateFunctionalDto);
    }
    
    /**
     * Удаление устройства
     * @param id UUID удаляемой функции устройства
     * @returns 
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.functionalService.delete(id);
    }

    /**
     * Метод получения устройств
     * @returns 
     */
    @Get()
    findAll() {
        return this.functionalService.findAll();
    }

    /**
     * Метож выполнения команды устройства
     */
    @Post('execute/:id')
    execute(@Param('id') id: string) {
        this.functionalService.executeCommand(id)
    }
}