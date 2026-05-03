import { IsNotEmpty, IsString, IsNumber, IsPositive, MinLength } from 'class-validator';

export class CreateBountyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  creatorId: string;
}