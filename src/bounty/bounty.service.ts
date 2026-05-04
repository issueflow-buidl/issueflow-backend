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
      id: Math.random().toString(36).substr(2, 9),
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
    const bounty = this.findOne(id);
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Can only update open bounties');
    }
    Object.assign(bounty, updateBountyDto, { updatedAt: new Date() });
    return bounty;
  }

  claim(id: string, claimBountyDto: ClaimBountyDto): Bounty {
    const bounty = this.findOne(id);
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Bounty is not available for claiming');
    }
    bounty.status = BountyStatus.IN_PROGRESS;
    bounty.claimedBy = claimBountyDto.claimedBy;
    bounty.claimedAt = new Date();
    bounty.updatedAt = new Date();
    return bounty;
  }

  cancel(id: string): Bounty {
    const bounty = this.findOne(id);
    if (bounty.status === BountyStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel completed bounty');
    }
    bounty.status = BountyStatus.CANCELLED;
    bounty.updatedAt = new Date();
    return bounty;
  }

  complete(id: string): Bounty {
    const bounty = this.findOne(id);
    if (bounty.status !== BountyStatus.IN_PROGRESS) {
      throw new BadRequestException('Can only complete bounties in progress');
    }
    bounty.status = BountyStatus.COMPLETED;
    bounty.completedAt = new Date();
    bounty.updatedAt = new Date();
    return bounty;
  }
}