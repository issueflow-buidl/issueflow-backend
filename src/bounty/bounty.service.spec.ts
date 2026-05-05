import { Test, TestingModule } from '@nestjs/testing';
import { BountyService } from './bounty.service';

describe('BountyService', () => {
  let service: BountyService;

  const mockBounties = [
    {
      id: '1',
      title: 'Test Bounty',
      description: 'Test Description',
      reward: 100,
      status: 'open',
      creatorId: 'user1',
      claimantId: null,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BountyService],
    }).compile();

    service = module.get<BountyService>(BountyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of bounties', async () => {
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});