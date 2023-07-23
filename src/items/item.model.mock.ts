import { model } from 'mongoose';
const mockingoose = require('mockingoose');
import { ItemsMock } from './entities/item.mock';
import { Items, ItemsSchema } from './items.model';

export const itemMock = { ...ItemsMock };

const itemsMock = [itemMock];

export const ItemMockModel: any = model(Items.name, ItemsSchema);
ItemMockModel.findById = jest.fn().mockResolvedValueOnce(itemMock);
ItemMockModel.findOne = jest.fn().mockResolvedValueOnce(itemMock);
ItemMockModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(itemMock);
ItemMockModel.updateOne = jest.fn().mockResolvedValueOnce(itemMock);
mockingoose(ItemMockModel).toReturn([...itemsMock]);
