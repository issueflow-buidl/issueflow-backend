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
      id: Math.random().toString(36).substr(2, 9),
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
    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    if (bountyIndex === -1) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }

    const updatedBounty = {
      ...this.bounties[bountyIndex],
      status: BountyStatus.IN_PROGRESS,
      assigneeId: claimBountyDto.assigneeId,
      updatedAt: new Date(),
    };

    this.bounties[bountyIndex] = updatedBounty;
    return updatedBounty;
  }

  cancel(id: string): Bounty {
    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    if (bountyIndex === -1) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }

    const updatedBounty = {
      ...this.bounties[bountyIndex],
      status: BountyStatus.CANCELLED,
      updatedAt: new Date(),
    };

    this.bounties[bountyIndex] = updatedBounty;
    return updatedBounty;
  }

  complete(id: string): Bounty {
    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    if (bountyIndex === -1) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }

    const updatedBounty = {
      ...this.bounties[bountyIndex],
      status: BountyStatus.COMPLETED,
      updatedAt: new Date(),
    };

    this.bounties[bountyIndex] = updatedBounty;
    return updatedBounty;
  }
}
