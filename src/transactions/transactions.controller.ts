import { Controller, Post, Body, Get, UsePipes } from '@nestjs/common';
import { CreateTransaction } from './dto/transactions.dto';
import { TransactionsService } from './transactions.service';
import { PayablesService } from '../payables/payables.service';
import { Transaction } from './interfaces/transaction.interface';
import { Payable } from '../payables/interfaces/payable.interface';
import { ValidationPipe } from './validation.pipe';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService,
        private readonly payablesService: PayablesService
    ) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createTransaction: CreateTransaction,) {
        this.transactionsService.create(createTransaction);

        const payable: Payable = {
            amount: 5000,
            status: 'paid',
            payment_date: new Date(),
        };

        this.payablesService.create(payable);

        return {
            message: 'Transaction processed with success.',
        };
    }

    @Get()
    async findAll() : Promise<Transaction[]> {
        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        return this.transactionsService.findAll();
    }
}
