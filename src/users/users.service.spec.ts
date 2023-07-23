import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from './users.model';
import { UserMockModel, userMock } from './users.model.mock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(Users.name),
          useValue: UserMockModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user successfully', async () => {
    // Prepare
    const mockUserDto = {
      email: 'test@123.com',
      password: '12341234',
      name: 'Test User',
    };
    UserMockModel.findOne = jest.fn().mockResolvedValueOnce(null);

    // Action
    const response = await service.create(mockUserDto);

    // Assert
    expect(response.email).toEqual(mockUserDto.email);
    expect(response.name).toEqual(mockUserDto.name);
    expect(response.password).toEqual(expect.any(String));
  });
  it('should find all users successfully', async () => {
    // Prepare

    // Action
    const response = await service.findAll();

    // Assert
    expect(response[0].email).toEqual(userMock.email);
    expect(response[0].name).toEqual(userMock.name);
    expect(response[0].id).toEqual(userMock._id);
  });
  it('should find a user by id successfully', async () => {
    // Prepare

    // Action
    const response = await service.findOneById(userMock._id);

    // Assert
    expect(response).toEqual(userMock);
  });
  it('should find a user by email successfully', async () => {
    // Prepare
    UserMockModel.findOne = jest.fn().mockResolvedValueOnce(userMock);
    // Action
    const response = await service.findOneByEmail(userMock.email);

    // Assert
    expect(response).toEqual(userMock);
  });
  it('should deposit an amount to user account successfully', async () => {
    // Prepare
    UserMockModel.findOne = jest.fn().mockResolvedValueOnce(userMock);

    // Action
    const response = await service.deposit(userMock._id, 200000);

    // Assert
    expect(response).toEqual({ ...userMock, balanceAmount: 200000 });
  });
});
