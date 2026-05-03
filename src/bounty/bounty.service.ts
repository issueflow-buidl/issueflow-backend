import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    };
    
    this.bounties.push(bounty);
    return bounty;
  }

  findAll(): Bounty[] {
    return this.bounties;
  }

  findOne(id: string): Bounty {
    const bounty = this.bounties.find(b => b.id === id);
    if (!bounty) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }
    return bounty;
  }

  update(id: string, updateBountyDto: UpdateBountyDto): Bounty {
    const bountyIndex = this.bounties.findIndex(b => b.id === id);
    if (bountyIndex === -1) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }

    this.bounties[bountyIndex] = {
      ...this.bounties[bountyIndex],
      ...updateBountyDto,
      updatedAt: new Date(),
    };

    return this.bounties[bountyIndex];
  }

  claim(id: string, claimBountyDto: ClaimBountyDto): Bounty {
    const bounty = this.findOne(id);
    
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Bounty is not available for claiming');
    }

    bounty.status = BountyStatus.IN_PROGRESS;
    bounty.claimedBy = claimBountyDto.claimedBy;
    bounty.updatedAt = new Date();

    return bounty;
  }

  cancel(id: string): Bounty {
    const bounty = this.findOne(id);
    
    if (bounty.status === BountyStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel a completed bounty');
    }

    bounty.status = BountyStatus.CANCELLED;
    bounty.updatedAt = new Date();

    return bounty;
  }

  complete(id: string): Bounty {
    const bounty = this.findOne(id);
    
    if (bounty.status !== BountyStatus.IN_PROGRESS) {
      throw new BadRequestException('Bounty must be in progress to complete');
    }

    bounty.status = BountyStatus.COMPLETED;
    bounty.updatedAt = new Date();

    return bounty;
  }
}