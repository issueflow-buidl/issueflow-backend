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

  describe('findAll', () => {
    it('should return an array of bounties', async () => {
      const result = [];
      mockRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });
});