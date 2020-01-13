import { IsString, IsInt, IsDefined, IsNumberString, MaxLength, MinLength } from 'class-validator';
import { PaymentMethod } from '../interfaces/payment-method.interface';

export class CreateTransaction {
    @IsDefined()
    @IsNumberString()
    readonly amount: number;

    @IsDefined()
    @IsString()
    readonly description: string;

    @IsDefined()
    @IsString()
    readonly method: PaymentMethod;

    @IsDefined()
    @IsString()
    @IsNumberString()
    @MaxLength(16)
    @MinLength(16)
    readonly card_number: string;

    @IsDefined()
    @IsString()
    readonly card_holder: string;

    @IsDefined()
    @IsString()
    @MaxLength(7)
    @MinLength(7)
    readonly card_expiration: string;

    @IsDefined()
    @IsString()
    @MaxLength(3)
    @MinLength(3)
    readonly card_cvv: string;
}
