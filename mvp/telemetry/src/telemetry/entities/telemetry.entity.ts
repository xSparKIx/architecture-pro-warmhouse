import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 * Сущность таблицы телеметрии
 */
@Entity('telemetry')
export class Telemetry {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'uuid' })
  deviceId: string;

  @Column({ type: 'jsonb', default: {} })
  data: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}