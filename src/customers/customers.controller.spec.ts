import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { ServiceUnavailableException } from '@nestjs/common';
import { PayablesService } from '../payables/payables.service';
import { Payables } from '../payables/payables.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../helpers/mocks';

describe('Customers Controller', () => {
  let controller: CustomersController;
  let service: PayablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        PayablesService,
        {
          provide: getRepositoryToken(Payables),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PayablesService>(PayablesService);
    controller = module.get<CustomersController>(CustomersController);
  });

  describe('balance', () => {

    it('should return the customer balance', async () => {
      const result = {
        available: 5000,
        waiting_funds: 5000,
      };

      jest.spyOn(service, 'getBalance').mockImplementation( () => new Promise( (resolve) => { resolve( { sum: '5000' } ); }) );

      expect( await controller.balance() ).toStrictEqual(result);
    });

    it('should throw exception if query to DB fails', async () => {
      jest.spyOn(service, 'getBalance').mockImplementation( () => new Promise( (resolve, reject) => { reject( new Error('Error') ); }) );

      try {
        await controller.balance();
      } catch ( e ) {
        expect(e).toBeInstanceOf(ServiceUnavailableException);
      }
    });

  }); // #balance

});
