import { PartialType } from '@nestjs/mapped-types';
import { CreateBountyDto } from './create-bounty.dto';
import { IsOptional, IsString, MaxLength, IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateBountyDto extends PartialType(CreateBountyDto) {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount?: number;

  @IsOptional()
  @IsString()
  currency?: string;
}
