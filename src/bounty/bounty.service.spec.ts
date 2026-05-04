import { Test, TestingModule } from '@nestjs/testing';
import { BountyService } from './bounty.service';

describe('BountyService', () => {
  let service: BountyService;

  const mockBountyRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BountyService,
        {
          provide: 'BountyRepository',
          useValue: mockBountyRepository,
        },
      ],
    }).compile();

    service = module.get<BountyService>(BountyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
