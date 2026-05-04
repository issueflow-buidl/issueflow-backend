import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bounty, BountyStatus } from './bounty.entity';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { ClaimBountyDto } from './dto/claim-bounty.dto';

@Injectable()
export class BountyService {
  constructor(
    @InjectRepository(Bounty)
    private bountyRepository: Repository<Bounty>,
  ) {}

  async create(createBountyDto: CreateBountyDto): Promise<Bounty> {
    const bounty = this.bountyRepository.create(createBountyDto);
    return this.bountyRepository.save(bounty);
  }

  async findAll(): Promise<Bounty[]> {
    return this.bountyRepository.find();
  }

  async findOne(id: string): Promise<Bounty> {
    const bounty = await this.bountyRepository.findOne({ where: { id } });
    if (!bounty) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }
    return bounty;
  }

  async update(id: string, updateBountyDto: UpdateBountyDto): Promise<Bounty> {
    const bounty = await this.findOne(id);
    
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Can only update open bounties');
    }

    Object.assign(bounty, updateBountyDto);
    return this.bountyRepository.save(bounty);
  }

  async claim(id: string, claimBountyDto: ClaimBountyDto): Promise<Bounty> {
    const bounty = await this.findOne(id);
    
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Bounty is not available for claiming');
    }

    bounty.status = BountyStatus.IN_PROGRESS;
    bounty.claimedBy = claimBountyDto.claimedBy;
    
    return this.bountyRepository.save(bounty);
  }

  async cancel(id: string): Promise<Bounty> {
    const bounty = await this.findOne(id);
    
    if (bounty.status === BountyStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel a completed bounty');
    }

    bounty.status = BountyStatus.CANCELLED;
    return this.bountyRepository.save(bounty);
  }

  async complete(id: string): Promise<Bounty> {
    const bounty = await this.findOne(id);
    
    if (bounty.status !== BountyStatus.IN_PROGRESS) {
      throw new BadRequestException('Bounty must be in progress to complete');
    }

    bounty.status = BountyStatus.COMPLETED;
    return this.bountyRepository.save(bounty);
  }
}
