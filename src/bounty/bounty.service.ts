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

    const bounty = this.bounties[bountyIndex];
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Can only update open bounties');
    }

    const updatedBounty = {
      ...bounty,
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

    const bounty = this.bounties[bountyIndex];
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Bounty is not available for claiming');
    }

    const updatedBounty = {
      ...bounty,
      status: BountyStatus.IN_PROGRESS,
      claimantId: claimBountyDto.claimantId,
      claimedAt: new Date(),
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

    const bounty = this.bounties[bountyIndex];
    if (bounty.status === BountyStatus.COMPLETED || bounty.status === BountyStatus.CANCELLED) {
      throw new BadRequestException('Cannot cancel a completed or already cancelled bounty');
    }

    const updatedBounty = {
      ...bounty,
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

    const bounty = this.bounties[bountyIndex];
    if (bounty.status !== BountyStatus.IN_PROGRESS) {
      throw new BadRequestException('Can only complete bounties that are in progress');
    }

    const updatedBounty = {
      ...bounty,
      status: BountyStatus.COMPLETED,
      completedAt: new Date(),
      updatedAt: new Date(),
    };

    this.bounties[bountyIndex] = updatedBounty;
    return updatedBounty;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}