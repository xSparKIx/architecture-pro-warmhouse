import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Device } from '../../devices/entities/device.entity';

/**
 * Сущность таблицы функционала
 */
@Entity()
export class Functionality {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Device, (device) => device.functionalities)
  @JoinColumn({ name: 'deviceId' })
  device: Device;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  command: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}