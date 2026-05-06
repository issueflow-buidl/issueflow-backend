import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  reward: number;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}