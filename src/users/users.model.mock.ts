import { model } from 'mongoose';
const mockingoose = require('mockingoose');
import { UsersMock } from './entities/users.mock';
import { Users, UsersSchema } from './users.model';

export const userMock = { ...UsersMock };

const usersMock = [userMock];

export const UserMockModel: any = model(Users.name, UsersSchema);
UserMockModel.findById = jest.fn().mockResolvedValueOnce(userMock);
UserMockModel.findOne = jest.fn().mockResolvedValueOnce(userMock);
UserMockModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(userMock);
UserMockModel.updateOne = jest.fn().mockResolvedValueOnce(userMock);
mockingoose(UserMockModel).toReturn([...usersMock]);
