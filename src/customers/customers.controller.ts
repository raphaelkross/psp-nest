import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { PayablesService } from '../payables/payables.service';
import { Balance } from '../payables/interfaces/balance.interface';
import { BalanceResponse } from '../payables/interfaces/balance-response.interface';

@Controller('customers')
export class CustomersController {
    constructor(private readonly payablesService: PayablesService) {}

    @Get('balance')
    async balance() : Promise<Balance> {
        let available: BalanceResponse;
        let waiting: BalanceResponse;

        try {
            available = await this.payablesService.getBalance('paid');
            waiting = await this.payablesService.getBalance('waiting_funds');
        }  catch ( error ) {
            console.error(error);
            throw new ServiceUnavailableException('Service unavailable. Try again later.')
        }

        return {
            available: parseInt(available.sum),
            waiting_funds: parseInt(waiting.sum),
        };
    }
}
