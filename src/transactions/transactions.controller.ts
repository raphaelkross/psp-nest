import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransaction } from './dto/transactions.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    async create(@Body() createTransaction: CreateTransaction,) {
        console.log(createTransaction);
        return 'Transaction Created';
    }
}
