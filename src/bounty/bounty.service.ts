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
      id: this.generateId(),
      title: createBountyDto.title,
      description: createBountyDto.description,
      amount: createBountyDto.amount,
      status: BountyStatus.OPEN,
      createdBy: createBountyDto.createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: createBountyDto.dueDate,
      tags: createBountyDto.tags,
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
    
    if (bounty.status === BountyStatus.COMPLETED || bounty.status === BountyStatus.CANCELLED) {
      throw new BadRequestException('Cannot update completed or cancelled bounty');
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
    bounty.claimedBy = claimBountyDto.claimedBy;
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
      throw new BadRequestException('Bounty must be in progress to complete');
    }

    bounty.status = BountyStatus.COMPLETED;
    bounty.completedBy = bounty.claimedBy;
    bounty.updatedAt = new Date();
    return bounty;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}