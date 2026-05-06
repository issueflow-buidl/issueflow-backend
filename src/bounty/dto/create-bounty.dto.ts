import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  reward: number;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
