import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { PayablesService } from './payables/payables.service';
import { CustomersController } from './customers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './transactions/transactions.entity';
import { Payables } from './payables/payables.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://jlpfezcu:vf6F0Ns8mSJ0i96jAIwKuv0uVq7xb2YJ@rajje.db.elephantsql.com:5432/jlpfezcu',
      username: 'jlpfezcu',
      password: 'vf6F0Ns8mSJ0i96jAIwKuv0uVq7xb2YJ',
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
