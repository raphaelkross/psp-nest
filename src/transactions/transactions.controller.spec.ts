import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transactions } from './transactions.entity';
import { Payables } from '../payables/payables.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PayablesService } from '../payables/payables.service';
import { mockRepository } from '../helpers/mocks';


describe('Transactions Controller', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        PayablesService,
        {
          provide: getRepositoryToken(Transactions),
          useClass: mockRepository 
        },
        {
          provide: getRepositoryToken(Payables),
          useClass: mockRepository 
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
