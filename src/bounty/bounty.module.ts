import { Module } from '@nestjs/common';
import { BountyController } from './bounty.controller';
import { BountyService } from './bounty.service';

@Module({
  controllers: [BountyController],
  providers: [BountyService],
})
export class BountyModule {}
