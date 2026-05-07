import { Test, TestingModule } from '@nestjs/testing';
import { BountyController } from './bounty.controller';
import { BountyService } from './bounty.service';

describe('BountyController', () => {
  let controller: BountyController;
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
      controllers: [BountyController],
      providers: [
        {
          provide: BountyService,
          useValue: mockBountyService,
        },
      ],
    }).compile();

    controller = module.get<BountyController>(BountyController);
    service = module.get<BountyService>(BountyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of bounties', async () => {
      const result = [];
      mockBountyService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });
});