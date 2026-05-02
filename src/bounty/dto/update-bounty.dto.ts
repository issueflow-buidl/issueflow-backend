import { PartialType } from '@nestjs/mapped-types';
import { CreateBountyDto } from './create-bounty.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { BountyStatus } from '../bounty.entity';

export class UpdateBountyDto extends PartialType(CreateBountyDto) {
  @IsOptional()
  @IsEnum(BountyStatus)
  status?: BountyStatus;
}