import { PartialType } from '@nestjs/mapped-types';
import { CreateBountyDto } from './create-bounty.dto';
import { IsOptional, IsString, IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateBountyDto extends PartialType(CreateBountyDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  reward?: number;
}