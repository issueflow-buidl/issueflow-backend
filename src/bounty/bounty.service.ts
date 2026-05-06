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
      claimantId: null,
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
      throw new Error('Bounty not found');
    }
    return bounty;
  }

  update(id: string, updateBountyDto: UpdateBountyDto): Bounty {
    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    if (bountyIndex === -1) {
      throw new Error('Bounty not found');
    }
    
    this.bounties[bountyIndex] = {
      ...this.bounties[bountyIndex],
      ...updateBountyDto,
      updatedAt: new Date(),
    };
    
    return this.bounties[bountyIndex];
  }

  claim(id: string, claimBountyDto: ClaimBountyDto): Bounty {
    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    if (bountyIndex === -1) {
      throw new Error('Bounty not found');
    }
    
    if (this.bounties[bountyIndex].status !== BountyStatus.OPEN) {
      throw new Error('Bounty is not available for claiming');
    }
    
    this.bounties[bountyIndex] = {
      ...this.bounties[bountyIndex],
      status: BountyStatus.IN_PROGRESS,
      claimantId: claimBountyDto.claimantId,
      updatedAt: new Date(),
    };
    
    return this.bounties[bountyIndex];
  }

  cancel(id: string): Bounty {
    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    if (bountyIndex === -1) {
      throw new Error('Bounty not found');
    }
    
    this.bounties[bountyIndex] = {
      ...this.bounties[bountyIndex],
      status: BountyStatus.CANCELLED,
      updatedAt: new Date(),
    };
    
    return this.bounties[bountyIndex];
  }

  complete(id: string): Bounty {
    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    if (bountyIndex === -1) {
      throw new Error('Bounty not found');
    }
    
    if (this.bounties[bountyIndex].status !== BountyStatus.IN_PROGRESS) {
      throw new Error('Bounty is not in progress');
    }
    
    this.bounties[bountyIndex] = {
      ...this.bounties[bountyIndex],
      status: BountyStatus.COMPLETED,
      updatedAt: new Date(),
    };
    
    return this.bounties[bountyIndex];
  }
}