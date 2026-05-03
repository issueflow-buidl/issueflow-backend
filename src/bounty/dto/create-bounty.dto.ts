import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  reward: number;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
