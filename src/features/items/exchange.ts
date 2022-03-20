import { isEqual } from 'lodash';
import { executeLogic } from '../../common/helpers/databse-unit-of-work';
import { Zombie } from '../../common/mongo/entities/zombie';
import { ZombieRepository } from '../../common/repositories/zombie-repository';
import { Item } from '../../common/services/clients/heroku/models/items-response';
import { HerokuClient } from '../../common/services/clients/heroku/heroku-client';
import { ParamsRequestDto } from '../zombie/model/params-request-dto';
import { ExchangeDto } from './model/exchange-dto';
import { getOrSet } from '../../common/services/redis/get-or-set';

export class ExchangeItems {
    private zombieRepository: ZombieRepository;

    constructor() {
        this.zombieRepository = new ZombieRepository();
    }

    public exchange = async ({ id }: ParamsRequestDto, { itemToExchange, itemToGet }: ExchangeDto): Promise<void> => {
        return executeLogic(async () => {
            const result = await this.findZombie(id);
            const itemToRemove = result.items.find(({ name }) => isEqual(name, itemToExchange));
            if (!itemToRemove) throw new Error(`Zombie has no item ${itemToExchange}`);

            const herokuClient = new HerokuClient();
            const { items } = await herokuClient.getItems();

            const expiration = this.calculateTimeUntilMidnit();
            const { name, price } = await getOrSet(itemToGet, [() => this.findItemInStore(items, itemToGet), expiration], undefined, undefined);
            
            result.items[result.items.indexOf(itemToRemove)] = {
                name: name,
                value: price,
            };

            await this.zombieRepository.updateOne(id, result);
        });
    };

    private findZombie = async (id: string): Promise<Zombie> => {
        const result = await this.zombieRepository.findOne(id);
        if (!result) throw new Error(`Zombie with given id ${id} was not found`);

        return result;
    };

    private findItemInStore = async (items: Item[], itemToGet: string): Promise<Item> => {
        const foundItem = items.find(({ name }) => isEqual(name, itemToGet));
        if (!foundItem) throw new Error(`There is no item ${itemToGet} in store`);

        return foundItem;
    };

    private calculateTimeUntilMidnit = (): number => {
        const now = new Date();
        const then = new Date(now);
        then.setHours(24, 0, 0, 0);
        return (then.getTime() - now.getTime());
    };
}
