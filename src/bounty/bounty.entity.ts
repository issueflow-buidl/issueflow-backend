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
  amount: number;

  @Column({
    type: 'enum',
    enum: BountyStatus,
    default: BountyStatus.OPEN,
  })
  status: BountyStatus;

  @Column({ nullable: true })
  creatorId: string;

  @Column({ nullable: true })
  assigneeId: string;

  @Column({ nullable: true })
  claimantId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  dueDate: Date;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: false })
  isFeatured: boolean;
}