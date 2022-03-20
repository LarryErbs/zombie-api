import { isEqual } from 'lodash';
import { CalculatedResponse } from '../../features/zombie/model/view-model/currency-view-model';
import { Item } from '../mongo/entities/item';
import { CurrencyResponse, RateInfo } from './clients/nbp/models/currencies-response';

export class CurrencyService {
    async getCurrencies(currencyCode: string[], { rates }: CurrencyResponse): Promise<RateInfo[]> {
        return rates
            .filter(({ code }) => currencyCode.some((currency) => isEqual(currency, code)))
            .map(({ code, mid }) => {
                return {
                    code,
                    mid,
                };
            });
    }

    async calculate(items: Item[], rates: RateInfo[]): Promise<CalculatedResponse[]> {
        const sum = items.map(({ value }) => value).reduce((previous, current) => previous + current);
        const result = rates.map((rate) => mapRate(rate, sum));

        return [
            {
                currency: 'PLN',
                total: sum,
            },
            ...result,
        ];
    }
}

const mapRate = ({ code, mid }: RateInfo, sum: number) => {
    const total = sum * Number(mid);
    return {
        currency: code,
        total: Number(total.toFixed(2)),
    } as CalculatedResponse;
};
