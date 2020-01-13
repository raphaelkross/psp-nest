import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction as ITransaction } from './interfaces/transaction.interface';
import { Repository } from 'typeorm';
import { Transactions } from './transactions.entity';
import { Transaction } from '@nestjs/common/interfaces/external/kafka-options.interface';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transactions)
        private readonly transactionRepository: Repository<Transactions>,
    ) {}

    create(transaction: ITransaction): Promise<Transactions> {
        return this.transactionRepository.save(transaction);
    }

    findAll(): Promise<Transactions[]> {
        return this.transactionRepository.find();
    }
}
