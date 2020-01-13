import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateTransaction } from './dto/transactions.dto';
import { TransactionsService } from './transactions.service';
import { Transaction } from './interfaces/transaction.interface';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    async create(@Body() createTransaction: CreateTransaction,) {
        console.log(createTransaction);
        this.transactionsService.create(createTransaction);
    }

    @Get()
    async findAll() : Promise<Transaction[]> {
        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        return this.transactionsService.findAll();
    }
}
