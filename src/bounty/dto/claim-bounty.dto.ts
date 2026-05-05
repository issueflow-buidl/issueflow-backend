import { IsNotEmpty, IsString } from 'class-validator';

export class ClaimBountyDto {
  @IsString()
  @IsNotEmpty()
  claimedBy: string;
}
