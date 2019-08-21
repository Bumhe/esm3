export interface PaymentInfo {
    userId?: string;
    userEmail?: string;
    amount?: number;
}

export interface PaymentInitialize {
    email: string;
    reference: string;
    amount: number;
    callback_url?:string;
}