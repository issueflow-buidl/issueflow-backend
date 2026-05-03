import { IsString, IsNumber, IsPositive, MinLength } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsNumber()
  @IsPositive()
  reward: number;

  @IsString()
  createdBy: string;
}
