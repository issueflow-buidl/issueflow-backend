import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
  @IsOptional()
  creatorId?: string;
}
