import { IsString, MinLength } from 'class-validator';

export class ClaimBountyDto {
  @IsString()
  @MinLength(1)
  claimedBy: string;
}
