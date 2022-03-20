import axios from 'axios';
import config from '../../../../config/config';
import { CurrencyResponse } from './models/currencies-response';

interface INbpClient {
    getCurrencies(): Promise<CurrencyResponse[]>;
}

export class NbpClient implements INbpClient {
    async getCurrencies(): Promise<CurrencyResponse[]> {
        const response = await axios.get(config.nbp.url);
        return response.data;
    }

}