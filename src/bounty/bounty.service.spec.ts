import { Test, TestingModule } from '@nestjs/testing';
import { BountyService } from './bounty.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { BountyStatus } from './bounty.entity';

describe('BountyService', () => {
  let service: BountyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BountyService],
    }).compile();

    service = module.get<BountyService>(BountyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a bounty', () => {
      const createBountyDto = {
        title: 'Test Bounty',
        description: 'Test Description',
        amount: 100,
        creatorId: 'creator-1',
      };

      const result = service.create(createBountyDto);

      expect(result).toMatchObject({
        title: 'Test Bounty',
        description: 'Test Description',
        amount: 100,
        creatorId: 'creator-1',
        status: BountyStatus.OPEN,
      });
      expect(result.id).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException for non-existent bounty', () => {
      expect(() => service.findOne('non-existent')).toThrow(NotFoundException);
    });
  });

  describe('claim', () => {
    it('should claim an open bounty', () => {
      const bounty = service.create({
        title: 'Test',
        description: 'Test',
        amount: 100,
        creatorId: 'creator-1',
      });

      const result = service.claim(bounty.id, { assigneeId: 'assignee-1' });

      expect(result.status).toBe(BountyStatus.IN_PROGRESS);
      expect(result.assigneeId).toBe('assignee-1');
    });
  });
});