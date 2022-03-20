import axios from 'axios';
import config from '../../../../config/config';
import { Items } from './models/items-response';

interface IHerokuClient {
    getItems(): Promise<Items>;
}

export class HerokuClient implements IHerokuClient {
    async getItems(): Promise<Items> {
        const response = await axios.get(config.heroku.url);
        return response.data;
    }

}