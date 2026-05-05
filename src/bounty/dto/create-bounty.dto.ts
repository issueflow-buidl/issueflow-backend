import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
