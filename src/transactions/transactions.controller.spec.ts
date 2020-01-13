import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUnavailableException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transactions } from './transactions.entity';
import { Payables } from '../payables/payables.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PayablesService } from '../payables/payables.service';
import { mockRepository } from '../helpers/mocks';
import { CreateTransaction } from './dto/transactions.dto';

describe('Transactions Controller', () => {
  let controller: TransactionsController;
  let service: TransactionsService;
  let servicePayables: PayablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        PayablesService,
        {
          provide: getRepositoryToken(Transactions),
          useClass: mockRepository,
        },
        {
          provide: getRepositoryToken(Payables),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    servicePayables = module.get<PayablesService>(PayablesService);
    controller = module.get<TransactionsController>(TransactionsController);
  });

  describe('findAll', () => {

    it('should return an array of transactions', async () => {
      const result = [
        {
          id: 10,
          amount: 1000,
          description: 'Desc',
          method: 'credit_card',
          card_number: '1234',
          card_holder: 'Rafael',
          card_expiration: '10/2022',
          card_cvv: '123',
        },
      ];

      jest.spyOn(service, 'findAll').mockImplementation( () => new Promise( (resolve) => { resolve( result ); }) );

      expect( await controller.findAll() ).toBe(result);
    });

    it('should throw exception if query to DB fails', async () => {
      jest.spyOn(service, 'findAll').mockImplementation( () => new Promise( (resolve, reject) => { reject( new Error('Error') ); }) );

      try {
        await controller.findAll();
      } catch ( e ) {
        expect(e).toBeInstanceOf(ServiceUnavailableException);
      }
    });

  }); // #findAll

  describe('create', () => {

    it('should create a transaction', async () => {
      const transactionInput: CreateTransaction = {
        amount: 1000,
        description: 'Desc',
        method: 'credit_card',
        card_number: '1234',
        card_holder: 'Rafael',
        card_expiration: '10/2022',
        card_cvv: '123',
      };

      const result = {
        id: 10,
        amount: 1000,
        description: 'Desc',
        method: 'credit_card',
        card_number: '1234',
        card_holder: 'Rafael',
        card_expiration: '10/2022',
        card_cvv: '123',
      };

      jest.spyOn(service, 'create').mockImplementation( () => new Promise( (resolve) => { resolve( result ); }) );
      jest.spyOn(servicePayables, 'create').mockImplementation( () => new Promise( (resolve) => { resolve(); }) );

      expect( await controller.create(transactionInput) ).toStrictEqual({ message: 'Transaction #10 processed with success.' });
    });

    it('should throw exception if query to DB fails when creating transaction', async () => {
      const transactionInput: CreateTransaction = {
        amount: 1000,
        description: 'Desc',
        method: 'credit_card',
        card_number: '1234',
        card_holder: 'Rafael',
        card_expiration: '10/2022',
        card_cvv: '123',
      };

      jest.spyOn(service, 'create').mockImplementation( () => new Promise( (resolve, reject) => { reject( new Error('Error') ); }) );

      try {
        await controller.create(transactionInput);
      } catch ( e ) {
        expect(e).toBeInstanceOf(ServiceUnavailableException);
      }
    });

    it('should throw exception if query to DB fails when creating payable', async () => {
      const transactionInput: CreateTransaction = {
        amount: 1000,
        description: 'Desc',
        method: 'credit_card',
        card_number: '1234',
        card_holder: 'Rafael',
        card_expiration: '10/2022',
        card_cvv: '123',
      };

      jest.spyOn(servicePayables, 'create').mockImplementation( () => new Promise( (resolve, reject) => { reject( new Error('Error') ); }) );

      try {
        await controller.create(transactionInput);
      } catch ( e ) {
        expect(e).toBeInstanceOf(ServiceUnavailableException);
      }
    });

  }); // #create

});
