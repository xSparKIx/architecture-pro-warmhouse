import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

/**
 * Контроллер управления устройствами
 */
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  /**
   * Создание устройства
   * @param createDeviceDto Данные для создания
   * @returns 
   */
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  /**
   * Обновление устройства
   * @param id UUID обновляемого устройства
   * @param updateDeviceDto Данные для обновления
   * @returns 
   */
  @Put(":id")
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(id, updateDeviceDto);
  }
  
  /**
   * Удаление устройства
   * @param id UUID обновляемого устройства
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.delete(id);
  }

  /**
   * Метод получения устройств
   * @returns 
   */
  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  /**
   * Метод получения устройства по UUID
   */
  @Get(":id")
  findById(@Param('id') id: string) {
    return this.devicesService.findById(id);
  }
}