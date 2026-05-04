import { Injectable } from '@nestjs/common';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { ClaimBountyDto } from './dto/claim-bounty.dto';
import { Bounty, BountyStatus } from './bounty.entity';

@Injectable()
export class BountyService {
  private bounties: Bounty[] = [];

  create(createBountyDto: CreateBountyDto): Bounty {
    const bounty: Bounty = {
      id: Math.random().toString(36).substr(2, 9),
      ...createBountyDto,
      status: BountyStatus.OPEN,
      claimedBy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.bounties.push(bounty);
    return bounty;
  }

  findAll(): Bounty[] {
    return this.bounties;
  }

  findOne(id: string): Bounty | undefined {
    return this.bounties.find((bounty) => bounty.id === id);
  }

  update(id: string, updateBountyDto: UpdateBountyDto): Bounty | undefined {
    const index = this.bounties.findIndex((bounty) => bounty.id === id);
    if (index === -1) return undefined;

    this.bounties[index] = {
      ...this.bounties[index],
      ...updateBountyDto,
      updatedAt: new Date(),
    };
    return this.bounties[index];
  }

  claim(id: string, claimBountyDto: ClaimBountyDto): Bounty | undefined {
    const index = this.bounties.findIndex((bounty) => bounty.id === id);
    if (index === -1) return undefined;

    this.bounties[index] = {
      ...this.bounties[index],
      status: BountyStatus.IN_PROGRESS,
      claimedBy: claimBountyDto.claimedBy,
      updatedAt: new Date(),
    };
    return this.bounties[index];
  }

  cancel(id: string): Bounty | undefined {
    const index = this.bounties.findIndex((bounty) => bounty.id === id);
    if (index === -1) return undefined;

    this.bounties[index] = {
      ...this.bounties[index],
      status: BountyStatus.CANCELLED,
      updatedAt: new Date(),
    };
    return this.bounties[index];
  }

  complete(id: string): Bounty | undefined {
    const index = this.bounties.findIndex((bounty) => bounty.id === id);
    if (index === -1) return undefined;

    this.bounties[index] = {
      ...this.bounties[index],
      status: BountyStatus.COMPLETED,
      updatedAt: new Date(),
    };
    return this.bounties[index];
  }
}
