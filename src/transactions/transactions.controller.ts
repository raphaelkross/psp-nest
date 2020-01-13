import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateTransaction } from './dto/transactions.dto';
import { TransactionsService } from './transactions.service';
import { PayablesService } from '../payables/payables.service';
import { Transaction } from './interfaces/transaction.interface';
import { Payable } from '../payables/interfaces/payable.interface';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService,
        private readonly payablesService: PayablesService
    ) {}

    @Post()
    async create(@Body() createTransaction: CreateTransaction,) {
        console.log(createTransaction);
        this.transactionsService.create(createTransaction);

        const payable: Payable = {
            amount: 5000,
            status: 'paid',
            payment_date: new Date(),
        };

        this.payablesService.create(payable);
    }

    @Get()
    async findAll() : Promise<Transaction[]> {
        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        return this.transactionsService.findAll();
    }
}
