import { IsNotEmpty, IsString } from 'class-validator';

export class ClaimBountyDto {
  @IsNotEmpty()
  @IsString()
  assigneeId: string;
}