import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getModelToken } from '@nestjs/mongoose';
import { Items } from './items.model';
import { ItemMockModel, itemMock } from './item.model.mock';
import { CreateItemDto } from './dto/create-item.dto';
import mongoose from 'mongoose';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getModelToken(Items.name),
          useValue: ItemMockModel,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an item successfully', async () => {
    // Prepare
    const mockItemDto: CreateItemDto = {
      itemName: 'Toyota Camry 2.0 L VVT i',
      price: 100000,
      durationInMinutes: 60,
      expired: false,
    };

    // Action
    const response = await service.create(mockItemDto);

    // Assert
    expect(response.itemName).toEqual(mockItemDto.itemName);
    expect(response.durationInMinutes).toEqual(mockItemDto.durationInMinutes);
    expect(response.price).toEqual(mockItemDto.price);
  });

  it('should find all items successfully', async () => {
    // Prepare

    // Action
    const response = await service.findAll();

    // Assert
    expect(response[0].itemName).toEqual(itemMock.itemName);
    expect(response[0].durationInMinutes).toEqual(itemMock.durationInMinutes);
    expect(response[0].price).toEqual(itemMock.price);
  });

  it('should find an item successfully', async () => {
    // Prepare

    // Action
    const response = await service.findOne(itemMock._id);

    // Assert
    expect(response).toEqual(itemMock);
  });

  it('should find an item and expire successfully', async () => {
    // Prepare
    ItemMockModel.findById = jest.fn().mockResolvedValueOnce(itemMock);
    ItemMockModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
      ...itemMock,
      expired: true,
    });
    // Action
    const response = await service.findOneAndExpire(itemMock._id);

    // Assert
    expect(response).toEqual({
      ...itemMock,
      expired: true,
    });
  });

  it('should find and item and nomitate bid winner successfully', async () => {
    // Prepare
    ItemMockModel.findById = jest.fn().mockResolvedValueOnce(itemMock);
    ItemMockModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
      ...itemMock,
      belongsTo: 'Test Winner',
    });

    // Action
    const response = await service.nominateBidWinner(
      itemMock._id,
      'Test Winner',
    );

    // Assert
    expect(response).toEqual({
      ...itemMock,
      belongsTo: 'Test Winner',
    });
  });
});
