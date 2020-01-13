export interface Transaction {
    id?: number;
    amount: number;
    description: string;
    method: string;
    card_number: string;
    card_holder: string;
    card_expiration: string;
    card_cvv: string;
}