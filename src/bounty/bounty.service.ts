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
      id: Math.random().toString(36).substring(2, 15),
      title: createBountyDto.title,
      description: createBountyDto.description,
      amount: createBountyDto.amount,
      status: BountyStatus.OPEN,
      creatorId: createBountyDto.creatorId,
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
    const bountyIndex = this.bounties.findIndex((bounty) => bounty.id === id);
    if (bountyIndex === -1) {
      return undefined;
    }

    this.bounties[bountyIndex] = {
      ...this.bounties[bountyIndex],
      ...updateBountyDto,
      updatedAt: new Date(),
    };
    return this.bounties[bountyIndex];
  }

  claim(id: string, claimBountyDto: ClaimBountyDto): Bounty | undefined {
    const bountyIndex = this.bounties.findIndex((bounty) => bounty.id === id);
    if (bountyIndex === -1) {
      return undefined;
    }

    this.bounties[bountyIndex] = {
      ...this.bounties[bountyIndex],
      status: BountyStatus.IN_PROGRESS,
      claimantId: claimBountyDto.claimantId,
      claimedAt: new Date(),
      updatedAt: new Date(),
    };
    return this.bounties[bountyIndex];
  }

  cancel(id: string): Bounty | undefined {
    const bountyIndex = this.bounties.findIndex((bounty) => bounty.id === id);
    if (bountyIndex === -1) {
      return undefined;
    }

    this.bounties[bountyIndex] = {
      ...this.bounties[bountyIndex],
      status: BountyStatus.CANCELLED,
      updatedAt: new Date(),
    };
    return this.bounties[bountyIndex];
  }

  complete(id: string): Bounty | undefined {
    const bountyIndex = this.bounties.findIndex((bounty) => bounty.id === id);
    if (bountyIndex === -1) {
      return undefined;
    }

    this.bounties[bountyIndex] = {
      ...this.bounties[bountyIndex],
      status: BountyStatus.COMPLETED,
      completedAt: new Date(),
      updatedAt: new Date(),
    };
    return this.bounties[bountyIndex];
  }
}
