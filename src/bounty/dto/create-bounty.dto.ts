import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsString()
  creatorId: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
