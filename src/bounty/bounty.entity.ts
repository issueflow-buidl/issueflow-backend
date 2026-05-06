import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BountyStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('bounties')
export class Bounty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  reward: number;

  @Column({
    type: 'enum',
    enum: BountyStatus,
    default: BountyStatus.OPEN,
  })
  status: BountyStatus;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'claimed_by', nullable: true })
  claimedBy?: string;

  @Column({ name: 'completed_by', nullable: true })
  completedBy?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'due_date', nullable: true })
  dueDate?: Date;

  @Column('text', { nullable: true })
  requirements?: string;

  @Column('simple-array', { nullable: true })
  tags?: string[];
}
