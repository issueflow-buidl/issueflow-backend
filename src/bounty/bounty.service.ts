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
    const bounty = this.bountyRepository.create({
      ...createBountyDto,
      dueDate: createBountyDto.dueDate ? new Date(createBountyDto.dueDate) : null,
    });
    return this.bountyRepository.save(bounty);
  }

  async findAll(): Promise<Bounty[]> {
    return this.bountyRepository.find({
      order: { createdAt: 'DESC' }
    });
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
    
    if (bounty.status === BountyStatus.COMPLETED || bounty.status === BountyStatus.CANCELLED) {
      throw new BadRequestException('Cannot update completed or cancelled bounty');
    }

    const updateData = {
      ...updateBountyDto,
      dueDate: updateBountyDto.dueDate ? new Date(updateBountyDto.dueDate) : bounty.dueDate,
    };

    await this.bountyRepository.update(id, updateData);
    return this.findOne(id);
  }

  async claim(id: string, claimBountyDto: ClaimBountyDto): Promise<Bounty> {
    const bounty = await this.findOne(id);
    
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Bounty is not available for claiming');
    }

    await this.bountyRepository.update(id, {
      assigneeId: claimBountyDto.assigneeId,
      status: BountyStatus.IN_PROGRESS,
    });
    
    return this.findOne(id);
  }

  async cancel(id: string): Promise<Bounty> {
    const bounty = await this.findOne(id);
    
    if (bounty.status === BountyStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel completed bounty');
    }

    await this.bountyRepository.update(id, {
      status: BountyStatus.CANCELLED,
    });
    
    return this.findOne(id);
  }

  async complete(id: string): Promise<Bounty> {
    const bounty = await this.findOne(id);
    
    if (bounty.status !== BountyStatus.IN_PROGRESS) {
      throw new BadRequestException('Bounty must be in progress to complete');
    }

    await this.bountyRepository.update(id, {
      status: BountyStatus.COMPLETED,
    });
    
    return this.findOne(id);
  }
}