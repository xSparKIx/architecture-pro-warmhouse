import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
    constructor(
        @InjectRepository(Device) private readonly deviceRepository: Repository<Device>  
    ) {}

    /**
     * Метод создания устройства
     * @param data
     */
    create(data: CreateDeviceDto): Promise<Device> {
        const device = this.deviceRepository.create(data);
        return this.deviceRepository.save(device);
    }

    /**
     * Метод обновления данных устройства
     * @param data 
     */
    async update(id: string, data: UpdateDeviceDto): Promise<UpdateResult> {
        return this.deviceRepository.update(id, data);
    }

    /**
     * Метод удаления устройства
     * @param id 
     * @returns 
     */
    delete(id: string): Promise<DeleteResult> {
        return this.deviceRepository.delete(id);
    }

    /**
     * Метод получения всех записей
     */
    findAll() {
      return this.deviceRepository.find();
    }
}
