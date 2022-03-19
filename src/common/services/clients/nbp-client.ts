import axios from 'axios';
import { CurrencyResponse } from './models/currencies-response';

interface INbpClient {
    getCurrencies(): Promise<CurrencyResponse[]>;
}

export class NbpClient implements INbpClient {
    async getCurrencies(): Promise<CurrencyResponse[]> {
        const response = await axios.get('https://api.nbp.pl/api/exchangerates/tables/a/');
        return response.data;
    }

}