import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  reward: number;

  @IsString()
  createdBy: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}
