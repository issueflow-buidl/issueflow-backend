import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BountyModule } from './bounty/bounty.module';

@Module({
  imports: [BountyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}