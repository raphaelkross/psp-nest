import { Injectable } from '@nestjs/common';
import { Payable } from './interfaces/payable.interface';

@Injectable()
export class PayablesService {
    private readonly payables: Payable[] = [];

    create(payable: Payable) {
        this.payables.push(payable);
    }

    findAll(): Payable[] {
        return this.payables;
    }
}
