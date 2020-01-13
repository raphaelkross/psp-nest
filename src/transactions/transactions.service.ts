import { Injectable } from '@nestjs/common';
import { Transaction } from './interfaces/transaction.interface';

@Injectable()
export class TransactionsService {
    private readonly transactions: Transaction[] = [];

    create(transaction: Transaction) {
        this.transactions.push(transaction);
    }

    findAll(): Transaction[] {
        return this.transactions;
    }
}
