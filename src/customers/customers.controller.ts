import { Controller, Get } from '@nestjs/common';
import { PayablesService } from '../payables/payables.service';
import { Balance } from '../payables/interfaces/balance.interface';

@Controller('customers')
export class CustomersController {
    constructor(private readonly payablesService: PayablesService) {}

    @Get('balance')
    async balance() : Promise<Balance> {
        const available = await this.payablesService.getBalance('paid');
        const waiting = await this.payablesService.getBalance('waiting_funds');

        return {
            available: parseInt(available.sum),
            waiting_funds: parseInt(waiting.sum),
        };
    }
}
