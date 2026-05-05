import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  reward: number;

  @IsString()
  @IsOptional()
  createdBy?: string;
}
