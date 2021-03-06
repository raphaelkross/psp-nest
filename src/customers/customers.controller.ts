import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { PayablesService } from '../payables/payables.service';
import { Balance } from '../payables/interfaces/balance.interface';
import { BalanceResponse } from '../payables/interfaces/balance-response.interface';

@Controller('customers')
export class CustomersController {
    constructor(private readonly payablesService: PayablesService) {}

    @Get('balance')
    async balance(): Promise<Balance> {
        let available: BalanceResponse;
        let waiting: BalanceResponse;

        try {
            available = await this.payablesService.getBalance('paid');
            waiting = await this.payablesService.getBalance('waiting_funds');
        }  catch ( error ) {
            throw new ServiceUnavailableException('Service unavailable. Try again later.');
		}

		const availableSum = available.sum !== null ? parseInt(available.sum, 10) : 0;
		const waitingSum = waiting.sum !== null ? parseInt(waiting.sum, 10) : 0;

        return {
            available: availableSum,
            waiting_funds: waitingSum,
        };
    }
}
