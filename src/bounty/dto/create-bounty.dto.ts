import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateBountyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
