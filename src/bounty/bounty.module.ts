import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BountyController } from './bounty.controller';
import { BountyService } from './bounty.service';
import { Bounty } from './bounty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bounty])],
  controllers: [BountyController],
  providers: [BountyService],
})
export class BountyModule {}
