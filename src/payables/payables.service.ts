import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../transactions/interfaces/transaction.interface';
import { Payable } from './interfaces/payable.interface';
import { Balance } from './interfaces/balance.interface';
import { Repository } from 'typeorm';
import { Payables } from './payables.entity';

@Injectable()
export class PayablesService {
    constructor(
        @InjectRepository(Payables)
        private readonly payableRepository: Repository<Payables>,
    ) {}

    create(payable: Payable): Promise<Payables> {
        return this.payableRepository.save(payable);
    }

    processTransaction(transaction: Transaction): Payable {
        const date_obj = new Date();
        let status: string = '';
        let date: string = '';
        let amount: number = 0;

        if ( transaction.method == 'debit_card' ) {
            status = 'paid';
            // D+0.
            date = date_obj.toString();
            // Discount 3% fee.
            amount = transaction.amount - ( ( transaction.amount / 100 ) * 3 );
        } else if ( transaction.method == 'credit_card' ) {
            status = 'waiting_funds';
            // D+30.
            date_obj.setDate(date_obj.getDate() + 30)
            date = date_obj.toString();
            // Discount 5% fee.
            amount = transaction.amount - ( ( transaction.amount / 100 ) * 5 );
        }
        
        return {
            amount: amount,
            status: status,
            payment_date: date,
        };
    }

    getBalance(): Balance {
        const balance: Balance = {
            available: 6000,
            waiting_funds: 40000,
        };

        return balance;
    }
}