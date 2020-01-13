import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { PayablesService } from './payables/payables.service';
import { CustomersController } from './customers/customers.controller';

@Module({
  imports: [],
  controllers: [TransactionsController, CustomersController],
  providers: [TransactionsService, PayablesService],
})
export class AppModule {}
