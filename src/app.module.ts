import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { PayablesService } from './payables/payables.service';

@Module({
  imports: [],
  controllers: [TransactionsController],
  providers: [TransactionsService, PayablesService],
})
export class AppModule {}
