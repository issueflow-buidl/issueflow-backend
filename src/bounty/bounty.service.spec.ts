import { Test, TestingModule } from '@nestjs/testing';
import { BountyService } from './bounty.service';

describe('BountyService', () => {
  let service: BountyService;

  const mockBountyService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    claim: jest.fn(),
    cancel: jest.fn(),
    complete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BountyService,
          useValue: mockBountyService,
        },
      ],
    }).compile();

    service = module.get<BountyService>(BountyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
