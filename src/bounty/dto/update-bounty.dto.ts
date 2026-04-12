import { IsString, IsNumber, IsOptional, IsUrl, IsDateString, Min } from 'class-validator';

export class UpdateBountyDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsUrl()
  githubIssueUrl?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}