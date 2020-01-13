import { PaymentMethod } from '../interfaces/payment-method.interface';


export class CreateTransaction {
    readonly amount: number;
    readonly description: string;
    readonly method: PaymentMethod;
    readonly card_number: string;
    readonly card_holder: string;
    readonly card_expiration: string;
    readonly card_cvv: string;
}
