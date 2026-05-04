import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
