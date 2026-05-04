import { IsNotEmpty, IsString, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateBountyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  reward: number;

  @IsNotEmpty()
  @IsString()
  creatorId: string;
}