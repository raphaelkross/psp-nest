import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { PayablesService } from './payables/payables.service';
import { CustomersController } from './customers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './transactions/transactions.entity';
import { Payables } from './payables/payables.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      entities: [ Transactions, Payables ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Transactions, Payables]),
  ],
  controllers: [TransactionsController, CustomersController],
  providers: [
    TransactionsService,
    PayablesService,
  ],
})
export class AppModule {}
