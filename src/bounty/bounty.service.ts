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

    this.bounties[bountyIndex] = {
      ...bounty,
      ...updateBountyDto,
      updatedAt: new Date(),
    };
    return this.bounties[bountyIndex];
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

    this.bounties[bountyIndex] = {
      ...bounty,
      status: BountyStatus.IN_PROGRESS,
      claimedBy: claimBountyDto.claimedBy,
      updatedAt: new Date(),
    };
    return this.bounties[bountyIndex];
  }

  cancel(id: string): Bounty {
    const bountyIndex = this.bounties.findIndex((b) => b.id === id);
    if (bountyIndex === -1) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }

    const bounty = this.bounties[bountyIndex];
    if (bounty.status === BountyStatus.COMPLETED || bounty.status === BountyStatus.CANCELLED) {
      throw new BadRequestException('Cannot cancel completed or already cancelled bounty');
    }

    this.bounties[bountyIndex] = {
      ...bounty,
      status: BountyStatus.CANCELLED,
      updatedAt: new Date(),
    };
    return this.bounties[bountyIndex];
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

    this.bounties[bountyIndex] = {
      ...bounty,
      status: BountyStatus.COMPLETED,
      updatedAt: new Date(),
    };
    return this.bounties[bountyIndex];
  }
}
