import { IsString, IsNotEmpty } from 'class-validator';

export class ClaimBountyDto {
  @IsString()
  @IsNotEmpty()
  claimantId: string;
}
