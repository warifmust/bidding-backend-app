import { Test, TestingModule } from '@nestjs/testing';
import { BidsService } from './bids.service';
import { BidsGateway } from './bids.gateway';
import { ItemsModule } from '../items/items.module';

describe('BidsService', () => {
  let service: BidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ItemsModule],
      providers: [BidsService, BidsGateway],
    }).compile();

    service = module.get<BidsService>(BidsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('rt', () => {});
});
