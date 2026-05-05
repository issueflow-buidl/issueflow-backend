import { Injectable } from '@nestjs/common';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { ClaimBountyDto } from './dto/claim-bounty.dto';
import { Bounty, BountyStatus } from './bounty.entity';

@Injectable()
export class BountyService {
  private bounties: Bounty[] = [];

  create(createBountyDto: CreateBountyDto) {
    const bounty: Bounty = {
      id: Math.random().toString(36).substr(2, 9),
      ...createBountyDto,
      status: BountyStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.bounties.push(bounty);
    return bounty;
  }

  findAll() {
    return this.bounties;
  }

  findOne(id: string) {
    return this.bounties.find((bounty) => bounty.id === id);
  }

  update(id: string, updateBountyDto: UpdateBountyDto) {
    const bountyIndex = this.bounties.findIndex((bounty) => bounty.id === id);
    if (bountyIndex > -1) {
      this.bounties[bountyIndex] = {
        ...this.bounties[bountyIndex],
        ...updateBountyDto,
        updatedAt: new Date(),
      };
      return this.bounties[bountyIndex];
    }
    return null;
  }

  claim(id: string, claimBountyDto: ClaimBountyDto) {
    const bounty = this.findOne(id);
    if (bounty && bounty.status === BountyStatus.OPEN) {
      bounty.status = BountyStatus.IN_PROGRESS;
      bounty.claimedBy = claimBountyDto.claimedBy;
      bounty.claimedAt = new Date();
      bounty.updatedAt = new Date();
      return bounty;
    }
    return null;
  }

  cancel(id: string) {
    const bounty = this.findOne(id);
    if (bounty) {
      bounty.status = BountyStatus.CANCELLED;
      bounty.updatedAt = new Date();
      return bounty;
    }
    return null;
  }

  complete(id: string) {
    const bounty = this.findOne(id);
    if (bounty && bounty.status === BountyStatus.IN_PROGRESS) {
      bounty.status = BountyStatus.COMPLETED;
      bounty.completedAt = new Date();
      bounty.updatedAt = new Date();
      return bounty;
    }
    return null;
  }
}
