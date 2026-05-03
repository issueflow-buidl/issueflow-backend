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
      title: createBountyDto.title,
      description: createBountyDto.description,
      reward: createBountyDto.reward,
      status: BountyStatus.OPEN,
      createdBy: createBountyDto.createdBy,
      claimedBy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      claimedAt: null,
      completedAt: null,
    };
    this.bounties.push(bounty);
    return bounty;
  }

  findAll(): Bounty[] {
    return this.bounties;
  }

  findOne(id: string): Bounty | null {
    return this.bounties.find((bounty) => bounty.id === id) || null;
  }

  update(id: string, updateBountyDto: UpdateBountyDto): Bounty | null {
    const bountyIndex = this.bounties.findIndex((bounty) => bounty.id === id);
    if (bountyIndex === -1) {
      return null;
    }

    const bounty = this.bounties[bountyIndex];
    Object.assign(bounty, updateBountyDto, { updatedAt: new Date() });
    return bounty;
  }

  claim(id: string, claimBountyDto: ClaimBountyDto): Bounty | null {
    const bounty = this.findOne(id);
    if (!bounty || bounty.status !== BountyStatus.OPEN) {
      return null;
    }

    bounty.status = BountyStatus.IN_PROGRESS;
    bounty.claimedBy = claimBountyDto.claimedBy;
    bounty.claimedAt = new Date();
    bounty.updatedAt = new Date();
    return bounty;
  }

  cancel(id: string): Bounty | null {
    const bounty = this.findOne(id);
    if (!bounty) {
      return null;
    }

    bounty.status = BountyStatus.CANCELLED;
    bounty.updatedAt = new Date();
    return bounty;
  }

  complete(id: string): Bounty | null {
    const bounty = this.findOne(id);
    if (!bounty || bounty.status !== BountyStatus.IN_PROGRESS) {
      return null;
    }

    bounty.status = BountyStatus.COMPLETED;
    bounty.completedAt = new Date();
    bounty.updatedAt = new Date();
    return bounty;
  }
}