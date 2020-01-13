import { Controller, Get } from '@nestjs/common';
import { PayablesService } from '../payables/payables.service';
import { Balance } from '../payables/interfaces/balance.interface';

@Controller('customers')
export class CustomersController {
    constructor(private readonly payablesService: PayablesService) {}

    @Get('balance')
    async balance() : Promise<Balance> {
        // throw new HttpException('Forbidden', HttpStatus.FORB

        return this.payablesService.getBalance();
    }
}
