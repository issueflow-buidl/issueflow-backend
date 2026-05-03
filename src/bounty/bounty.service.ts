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
      claimerId: null,
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
    const bounty = this.findOne(id);
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Only open bounties can be updated');
    }
    Object.assign(bounty, updateBountyDto);
    bounty.updatedAt = new Date();
    return bounty;
  }

  claim(id: string, claimBountyDto: ClaimBountyDto): Bounty {
    const bounty = this.findOne(id);
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Bounty is not available for claiming');
    }
    bounty.status = BountyStatus.IN_PROGRESS;
    bounty.claimerId = claimBountyDto.claimerId;
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
      throw new BadRequestException('Only in-progress bounties can be completed');
    }
    bounty.status = BountyStatus.COMPLETED;
    bounty.updatedAt = new Date();
    return bounty;
  }
}