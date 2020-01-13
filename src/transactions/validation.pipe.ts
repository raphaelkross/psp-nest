import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { CreateTransaction } from './dto/transactions.dto';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        const object = plainToClass(metatype, value);

        const errors = await validate(object);

        if (errors.length > 0) {
            throw new BadRequestException('Validation failed. Check API reference to learn more about this endpoint parameters.');
        }

        if(value.method != 'credit_card' && value.method != 'debit_card') {
            throw new BadRequestException('Validation failed. Invalid payment method type.');
        }

        return value;
    }
}