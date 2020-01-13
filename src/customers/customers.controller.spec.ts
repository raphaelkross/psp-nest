import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { PayablesService } from '../payables/payables.service';
import { Payables } from '../payables/payables.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../helpers/mocks';

describe('Customers Controller', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        PayablesService,
        {
          provide: getRepositoryToken(Payables),
          useClass: mockRepository 
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
