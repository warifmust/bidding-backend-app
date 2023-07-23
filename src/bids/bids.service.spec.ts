import { Test, TestingModule } from '@nestjs/testing';
import { BidsService } from './bids.service';
import { BidsGateway } from './bids.gateway';
import { getModelToken } from '@nestjs/mongoose';
import { Bids } from './bids.model';
import { BidMockModel, bidMock } from './bid.model.mock';
import { Users } from '../users/users.model';
import { UserMockModel, userMock } from '../users/users.model.mock';
import { Items } from '../items/items.model';
import { ItemMockModel, itemMock } from '../items/item.model.mock';
import { CreateBidDto } from './dto/create-bid.dto';

describe('BidsService', () => {
  let service: BidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BidsService,
        BidsGateway,
        {
          provide: getModelToken(Bids.name),
          useValue: BidMockModel,
        },
        {
          provide: getModelToken(Users.name),
          useValue: UserMockModel,
        },
        {
          provide: getModelToken(Items.name),
          useValue: ItemMockModel,
        },
      ],
    }).compile();

    service = module.get<BidsService>(BidsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a bid successfully', async () => {
    // Prepare
    const mockBidDto: CreateBidDto = {
      price: 100,
      itemId: itemMock._id,
      bidderName: 'Test Bidder Name',
    };

    // Action
    const response = await service.create(mockBidDto, userMock._id);

    // Assert
    expect(response.price).toEqual(mockBidDto.price);
    expect(response.itemId).toEqual(mockBidDto.itemId);
    expect(response.bidderName).toEqual(mockBidDto.bidderName);
  });

  it('should find all bids successfully', async () => {
    //Prepare

    // Action
    const response = await service.findAll();
    // Assert
    expect(Array.isArray(response)).toBe(true);
    expect(response[0].price).toEqual(bidMock.price);
    expect(response[0].itemId).toEqual(bidMock.itemId);
    expect(response[0].bidderName).toEqual(bidMock.bidderName);
  });

  it('should find one bid by id successfully', async () => {
    //Prepare

    // Action
    const response = await service.findOne(userMock._id);
    // Assert
    expect(response.price).toEqual(bidMock.price);
    expect(response.itemId).toEqual(bidMock.itemId);
    expect(response.bidderName).toEqual(bidMock.bidderName);
  });

  it('should find all bids for one item successfully', async () => {
    //Prepare

    // Action
    const response = await service.findBidsForOneItem(itemMock._id);
    // Assert
    expect(Array.isArray(response)).toBe(true);
    expect(response[0].price).toEqual(bidMock.price);
    expect(response[0].itemId).toEqual(bidMock.itemId);
    expect(response[0].bidderName).toEqual(bidMock.bidderName);
  });

  it('should find highest bidder and nominate bidder', async () => {
    //Prepare
    BidMockModel.findOne = jest.fn().mockResolvedValueOnce(bidMock);
    BidMockModel.findOneAndUpdate = jest.fn();
    // Action
    const response = await service.findOneAndNominate(itemMock._id);
    // Assert
    expect(response).toEqual(itemMock);
  });
});
