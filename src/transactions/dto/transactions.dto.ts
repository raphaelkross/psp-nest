interface PaymentMethod {
    type: "debit_card" | "credit_card";
}

export class CreateTransaction {
    readonly amount: number;
    readonly description: string;
    readonly method: PaymentMethod;
    readonly card_number: string;
    readonly card_holder: string;
    readonly card_expiration: string;
    readonly card_cvv: string;
}
