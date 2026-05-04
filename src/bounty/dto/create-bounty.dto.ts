import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  createdBy?: string;
}
