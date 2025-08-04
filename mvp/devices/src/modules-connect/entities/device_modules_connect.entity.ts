// src/modules-connect/entities/device-module.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Device } from '../../devices/entities/device.entity';
import { Module } from '../../modules/entities/module.entity';

@Entity('device_modules_connect')
export class DeviceModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'device_id' })
  @Index() // Индекс для ускорения поиска
  deviceId: string;

  @Column({ type: 'uuid', name: 'module_id' })
  @Index()
  moduleId: string;

  // Связь с устройством
  @ManyToOne(() => Device, (device) => device.moduleConnections, {
    onDelete: 'CASCADE', // Каскадное удаление при удалении устройства
  })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  // Связь с модулем
  @ManyToOne(() => Module, (module) => module.deviceConnections, {
    onDelete: 'CASCADE', // Каскадное удаление при удалении модуля
  })
  @JoinColumn({ name: 'module_id' })
  module: Module;

  // Дополнительные поля (если нужны)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}