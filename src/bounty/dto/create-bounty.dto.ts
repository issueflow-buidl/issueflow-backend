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
  creatorId: string;

  @IsString()
  @IsOptional()
  requirements?: string;

  @IsDateString()
  @IsOptional()
  deadline?: Date;
}
