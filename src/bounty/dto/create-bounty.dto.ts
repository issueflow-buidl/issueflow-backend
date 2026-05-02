import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsUrl, IsDateString } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @IsOptional()
  @IsUrl()
  githubIssueUrl?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}