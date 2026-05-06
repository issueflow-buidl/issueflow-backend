import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateBountyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  creatorId: string;
}
