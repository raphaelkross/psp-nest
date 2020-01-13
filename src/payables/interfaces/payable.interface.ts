export interface Payable {
    amount: number;
    status: 'paid' | 'waiting_funds';
    payment_date: Date;
}