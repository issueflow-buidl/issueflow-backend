import { IsUUID } from 'class-validator';

export class ClaimBountyDto {
  @IsUUID()
  assigneeId: string;
}
