export interface CurrencyResponse {
    table: string;
    no: string;
    effectiveDate: string;
    rates: Rate[];
}

export interface Rate extends RateInfo {
    currency: string;    
}

export interface RateInfo {
    code: string;
    mid: string;
}
