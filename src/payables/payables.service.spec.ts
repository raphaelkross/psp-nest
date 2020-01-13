import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from './payables.service';
import { mockRepository } from '../helpers/mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payables } from './payables.entity';
import { Transaction } from '../transactions/interfaces/transaction.interface';
import { Payable } from './interfaces/payable.interface';

const mockDate = (expected: Date) => {
  const _Date = Date;

  // If any Date or number is passed to the constructor
  // use that instead of our mocked date
  function MockDate(mockOverride?: Date | number) {
    return new _Date(mockOverride || expected);
  }

  MockDate.UTC = _Date.UTC;
  MockDate.parse = _Date.parse;
  MockDate.now = () => expected.getTime();
  // Give our mock Date has the same prototype as Date
  // Some libraries rely on this to identify Date objects
  MockDate.prototype = _Date.prototype;

  // Our mock is not a full implementation of Date
  // Types will not match but it's good enough for our tests
  global.Date = MockDate as any;

  // Callback function to remove the Date mock
  return () => {
    global.Date = _Date;
  };
};

describe('Payables Service', () => {
  let service: PayablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayablesService,
        {
          provide: getRepositoryToken(Payables),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PayablesService>(PayablesService);
  });

  describe('processTransaction', () => {

    it('should process a transaction with debit card', () => {
      mockDate( new Date(2020, 0, 10) );

      const input: Transaction = {
        id: 10,
        amount: 1000,
        description: 'Desc',
        method: 'debit_card',
        card_number: '1234',
        card_holder: 'Rafael',
        card_expiration: '10/2022',
        card_cvv: '123',
      };

      // Takes off 3% fee.
      // Adds D+30 to date.
      const expected: Payable = {
        amount: 970,
        status: 'paid',
        payment_date: 'Fri Jan 10 2020 00:00:00 GMT-0200 (-02)',
      };

      expect( service.processTransaction(input) ).toStrictEqual(expected);
    });

    it('should process a transaction with credit card', () => {
      const input: Transaction = {
        id: 10,
        amount: 1000,
        description: 'Desc',
        method: 'credit_card',
        card_number: '1234',
        card_holder: 'Rafael',
        card_expiration: '10/2022',
        card_cvv: '123',
      };

      // Takes off 5% fee.
      // Adds D+30 to date.
      const expected: Payable = {
        amount: 950,
        status: 'waiting_funds',
        payment_date: 'Sun Feb 09 2020 00:00:00 GMT-0200 (-02)',
      };

      expect( service.processTransaction(input) ).toStrictEqual(expected);
    });

  }); // # processTransaction

});
