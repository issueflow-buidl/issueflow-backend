import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { ClaimBountyDto } from './dto/claim-bounty.dto';
import { Bounty, BountyStatus } from './bounty.entity';

@Injectable()
export class BountyService {
  private bounties: Bounty[] = [];

  create(createBountyDto: CreateBountyDto): Bounty {
    const bounty: Bounty = {
      id: Date.now().toString(),
      ...createBountyDto,
      status: BountyStatus.OPEN,
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

  findOne(id: string): Bounty {
    const bounty = this.bounties.find((b) => b.id === id);
    if (!bounty) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }
    return bounty;
  }

  update(id: string, updateBountyDto: UpdateBountyDto): Bounty {
    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    if (bountyIndex === -1) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }

    const updatedBounty = {
      ...this.bounties[bountyIndex],
      ...updateBountyDto,
      updatedAt: new Date(),
    };
    this.bounties[bountyIndex] = updatedBounty;
    return updatedBounty;
  }

  claim(id: string, claimBountyDto: ClaimBountyDto): Bounty {
    const bounty = this.findOne(id);
    if (bounty.status !== BountyStatus.OPEN) {
      throw new Error('Bounty is not available for claiming');
    }

    const updatedBounty = {
      ...bounty,
      status: BountyStatus.IN_PROGRESS,
      claimedBy: claimBountyDto.userId,
      claimedAt: new Date(),
      updatedAt: new Date(),
    };

    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    this.bounties[bountyIndex] = updatedBounty;
    return updatedBounty;
  }

  cancel(id: string): Bounty {
    const bounty = this.findOne(id);
    if (bounty.status === BountyStatus.COMPLETED) {
      throw new Error('Cannot cancel a completed bounty');
    }

    const updatedBounty = {
      ...bounty,
      status: BountyStatus.CANCELLED,
      updatedAt: new Date(),
    };

    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    this.bounties[bountyIndex] = updatedBounty;
    return updatedBounty;
  }

  complete(id: string): Bounty {
    const bounty = this.findOne(id);
    if (bounty.status !== BountyStatus.IN_PROGRESS) {
      throw new Error('Bounty must be in progress to be completed');
    }

    const updatedBounty = {
      ...bounty,
      status: BountyStatus.COMPLETED,
      completedAt: new Date(),
      updatedAt: new Date(),
    };

    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    this.bounties[bountyIndex] = updatedBounty;
    return updatedBounty;
  }
}