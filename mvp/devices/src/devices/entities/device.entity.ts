import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Functionality } from '../../functional/entities/functionality.entity';
import { DeviceModule } from '../../modules-connect/entities/device_modules_connect.entity';

/**
 * Сущность таблицы устройств
 */
@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @Column()
  serial_number: string;

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Functionality, (functionality) => functionality.device)
  functionalities: Functionality[];

  @OneToMany(() => DeviceModule, deviceModule => deviceModule.device)
  moduleConnections: DeviceModule[];
}