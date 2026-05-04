import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

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
  reward: number;

  @IsNotEmpty()
  @IsString()
  creatorId: string;
}
