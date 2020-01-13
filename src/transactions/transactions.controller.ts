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
    async create(@Body() createTransaction: CreateTransaction) {
        
        // Process the payment with gateway.

        // Remove the last 4 digits of credit card.
        createTransaction.card_number = createTransaction.card_number.substr(createTransaction.card_number.length - 4);

        // Save the Transaction at Database.
        const transaction: Transaction = await this.transactionsService.create(createTransaction);

        const processedPayabled = this.payablesService.processTransaction(transaction);

        this.payablesService.create(processedPayabled);

        return {
            message: `Transaction #${transaction.id} processed with success.`,
        };
    }

    @Get()
    async findAll() : Promise<Transaction[]> {
        return this.transactionsService.findAll();
    }
}
