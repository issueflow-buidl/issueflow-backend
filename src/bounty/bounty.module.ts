import { Module } from '@nestjs/common';
import { BountyService } from './bounty.service';
import { BountyController } from './bounty.controller';

@Module({
  controllers: [BountyController],
  providers: [BountyService],
})
export class BountyModule {}
