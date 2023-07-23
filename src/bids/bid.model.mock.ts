import { model } from 'mongoose';
const mockingoose = require('mockingoose');
import { Bids, BidsSchema } from './bids.model';
import { BidsMock } from './entities/bid.mock';

export const bidMock = { ...BidsMock };

const bidsMock = [bidMock];

export const BidMockModel: any = model(Bids.name, BidsSchema);
BidMockModel.findById = jest.fn().mockResolvedValueOnce(bidMock);
BidMockModel.findOne = jest.fn().mockResolvedValueOnce(bidMock);
BidMockModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(bidMock);
mockingoose(BidMockModel).toReturn([...bidsMock]);
