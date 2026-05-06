import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { ClaimBountyDto } from './dto/claim-bounty.dto';
import { Bounty, BountyStatus } from './bounty.entity';

@Injectable()
export class BountyService {
  private bounties: Bounty[] = [];

  async create(createBountyDto: CreateBountyDto): Promise<Bounty> {
    const bounty: Bounty = {
      id: Math.random().toString(36).substr(2, 9),
      title: createBountyDto.title,
      description: createBountyDto.description,
      reward: createBountyDto.reward,
      status: BountyStatus.OPEN,
      creatorId: createBountyDto.creatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.bounties.push(bounty);
    return bounty;
  }

  async findAll(): Promise<Bounty[]> {
    return this.bounties;
  }

  async findOne(id: string): Promise<Bounty> {
    const bounty = this.bounties.find((b) => b.id === id);
    if (!bounty) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }
    return bounty;
  }

  async update(id: string, updateBountyDto: UpdateBountyDto): Promise<Bounty> {
    const bounty = await this.findOne(id);
    Object.assign(bounty, updateBountyDto);
    bounty.updatedAt = new Date();
    return bounty;
  }

  async claim(id: string, claimBountyDto: ClaimBountyDto): Promise<Bounty> {
    const bounty = await this.findOne(id);
    bounty.status = BountyStatus.IN_PROGRESS;
    bounty.claimantId = claimBountyDto.claimantId;
    bounty.claimedAt = new Date();
    bounty.updatedAt = new Date();
    return bounty;
  }

  async cancel(id: string): Promise<Bounty> {
    const bounty = await this.findOne(id);
    bounty.status = BountyStatus.CANCELLED;
    bounty.updatedAt = new Date();
    return bounty;
  }

  async complete(id: string): Promise<Bounty> {
    const bounty = await this.findOne(id);
    bounty.status = BountyStatus.COMPLETED;
    bounty.updatedAt = new Date();
    return bounty;
  }
}
