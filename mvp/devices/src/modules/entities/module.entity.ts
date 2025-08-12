// src/modules/entities/module.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany 
} from 'typeorm';
import { DeviceModule } from '../../modules-connect/entities/device_modules_connect.entity';

@Entity('modules')
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'varchar', 
    length: 255, 
    nullable: false 
  })
  name: string;

  @Column({ 
    type: 'text', 
    nullable: true,
  })
  description: string | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Связь с таблицей device_modules (для ManyToMany)
  @OneToMany(() => DeviceModule, (connection) => connection.module)
  deviceConnections: DeviceModule[];
}