export interface Transaction {
    readonly amount: number;
    readonly description: string;
    readonly method: string;
    readonly card_number: string;
    readonly card_holder: string;
    readonly card_expiration: string;
    readonly card_cvv: string;
}