import { IsString, IsNumber, IsNotEmpty, IsPositive, MinLength } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
