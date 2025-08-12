import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Functionality } from "./entities/functionality.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateFunctionalDto } from "./dto/create-functional.dto";
import { UpdateFunctionalDto } from "./dto/update-functional.dto";

@Injectable()
export class FunctionalService {
    constructor(
        @InjectRepository(Functionality) private readonly functionalRepository: Repository<Functionality>,
    ) {}

    /**
     * Метод создания функции устройства
     * @param data
     */
    create(data: CreateFunctionalDto): Promise<Functionality> {
        const func = this.functionalRepository.create({
            ...data,
            device: { id: data.deviceId },
        });
        return this.functionalRepository.save(func);
    }

    /**
     * Метод обновления данных функции устройства
     * @param id
     * @param data 
     */
    async update(id: string, data: UpdateFunctionalDto): Promise<UpdateResult> {
        const func = {
            ...data,
            device: { id: data.deviceId },
        };
        return this.functionalRepository.update(id, func);
    }

    /**
     * Метод удаления функции устройства
     * @param id 
     * @returns 
     */
    delete(id: string): Promise<DeleteResult> {
        return this.functionalRepository.delete(id);
    }

    /**
     * Метод получения всех записей
     */
    findAll() {
        return this.functionalRepository.find();
    }

    /**
     * Метод выполнения функции устройства
     * @param id Комманда, которую надо выполнить
     */
    executeCommand(id: string) {
        console.log(`Выполняю команду ${id}`);
    }
}