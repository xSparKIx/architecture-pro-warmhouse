import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { DeleteResult, Repository } from 'typeorm';
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
    async update(id: string, data: UpdateDeviceDto): Promise<Device> {
        const device = await this.deviceRepository.findOne({ where: { id }});

        if (!device) {
            throw new NotFoundException(`Устройство с id ${id} найдено не было`);
        }

        return this.deviceRepository.save(Object.assign(device, data));
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
      return this,this.deviceRepository.find();
    }
}
