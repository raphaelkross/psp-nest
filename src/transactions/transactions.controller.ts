import { Controller, Post, Body, Get, UsePipes, ServiceUnavailableException } from '@nestjs/common';
import { CreateTransaction } from './dto/transactions.dto';
import { TransactionsService } from './transactions.service';
import { PayablesService } from '../payables/payables.service';
import { Transaction } from './interfaces/transaction.interface';
import { ValidationPipe } from './validation.pipe';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService,
        private readonly payablesService: PayablesService,
    ) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createTransaction: CreateTransaction) {

        // Process the payment with gateway.

        // Remove the last 4 digits of credit card.
        createTransaction.card_number = createTransaction.card_number.substr(createTransaction.card_number.length - 4);

        let transaction: Transaction;

        // Save the Transaction at Database.
        try {
            transaction = await this.transactionsService.create(createTransaction);
        }  catch ( error ) {
            throw new ServiceUnavailableException('Service unavailable. Try again later.');
        }

        // Process the payable.
        const processedPayabled = this.payablesService.processTransaction(transaction);

        // Save the Payable at database.
        try {
            this.payablesService.create(processedPayabled);
        }  catch ( error ) {
            throw new ServiceUnavailableException('Service unavailable. Try again later.');
        }

        return {
            message: `Transaction #${transaction.id} processed with success.`,
        };
    }

    @Get()
    async findAll(): Promise<Transaction[]> {
        let transactions: Transaction[];

        try {
            transactions = await this.transactionsService.findAll();
        }  catch ( error ) {
            throw new ServiceUnavailableException('Service unavailable. Try again later.');
        }

        return transactions;
    }
}
