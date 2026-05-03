import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateBountyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  creatorId: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}