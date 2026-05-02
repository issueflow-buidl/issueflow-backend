import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BountyService } from './bounty.service';
import { Bounty, BountyStatus } from './bounty.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BountyService', () => {
  let service: BountyService;
  let repository: Repository<Bounty>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BountyService,
        {
          provide: getRepositoryToken(Bounty),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BountyService>(BountyService);
    repository = module.get<Repository<Bounty>>(getRepositoryToken(Bounty));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a bounty if found', async () => {
      const bounty = { id: '1', title: 'Test Bounty' };
      mockRepository.findOne.mockResolvedValue(bounty);

      const result = await service.findOne('1');
      expect(result).toEqual(bounty);
    });

    it('should throw NotFoundException if bounty not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });
});