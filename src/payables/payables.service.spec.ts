import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from './payables.service';
import { mockRepository } from '../helpers/mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payables } from './payables.entity';

describe('PayablesService', () => {
  let service: PayablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayablesService,
        {
          provide: getRepositoryToken(Payables),
          useClass: mockRepository 
        },
      ],
    }).compile();

    service = module.get<PayablesService>(PayablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
