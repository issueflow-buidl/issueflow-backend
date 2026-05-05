import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBountyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  reward: number;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
