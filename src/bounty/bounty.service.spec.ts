import { Test, TestingModule } from '@nestjs/testing';
import { BountyService } from './bounty.service';
import { NotFoundException } from '@nestjs/common';
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
        createdBy: 'user1',
      };

      const result = service.create(createBountyDto);

      expect(result).toMatchObject({
        title: 'Test Bounty',
        description: 'Test Description',
        amount: 100,
        createdBy: 'user1',
        status: BountyStatus.OPEN,
      });
      expect(result.id).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException when bounty not found', () => {
      expect(() => service.findOne('nonexistent')).toThrow(
        NotFoundException,
      );
    });
  });
});
