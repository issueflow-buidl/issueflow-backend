import { IsString, IsNumber, IsOptional, IsDateString, IsUUID } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsUUID()
  creatorId: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
