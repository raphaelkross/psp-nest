import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { mockRepository } from '../helpers/mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transactions } from './transactions.entity';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transactions),
          useClass: mockRepository 
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
