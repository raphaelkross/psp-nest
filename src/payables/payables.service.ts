import { Injectable } from '@nestjs/common';
import { Payable } from './interfaces/payable.interface';
import { Balance } from './interfaces/balance.interface';

@Injectable()
export class PayablesService {
    private readonly payables: Payable[] = [];

    create(payable: Payable) {
        this.payables.push(payable);
    }

    findAll(): Payable[] {
        return this.payables;
    }

    getBalance(): Balance {
        const balance: Balance = {
            available: 6000,
            waiting_funds: 40000,
        };

        return balance;
    }
}
