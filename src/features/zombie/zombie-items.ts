import { NbpClient } from '../../common/services/clients/nbp-client';
import { executeLogic } from '../../common/helpers/databse-unit-of-work';
import { Item } from '../../common/mongo/entities/item';
import { ZombieRepository } from '../../common/repositories/zombie-repository';
import { hasEqualName, hasMoreItemsThanFive, hasNoItems } from './helpers/items-helper';
import { mapToItem, mapToItemViewModel } from './mapper/mappers';
import { ItemDto } from './model/item-dto';
import { ParamsRequestDto } from './model/params-request-dto';
import { CurrencyService } from '../../common/services/currency-service';
import { CalculatedResponse } from './model/view-model/currency-view-model';

export class ZombieItems {
    private zombieRepository!: ZombieRepository;

    constructor() {
        this.zombieRepository = new ZombieRepository();
    }

    public getItems = async ({ id }: ParamsRequestDto): Promise<ZombieItems[]> => {
        return executeLogic(async () => {
            const result = await this.zombieRepository.findOne(id);
            if (!result) throw new Error(`Zombie with given id ${id} was not found`);

            return result.items.map(mapToItemViewModel);
        });
    };

    public calculateItems = async ({ id }: ParamsRequestDto): Promise<CalculatedResponse[]> => {
        return executeLogic(async () => {
            const result = await this.zombieRepository.findOne(id);
            if (!result) throw new Error(`Zombie with given id ${id} was not found`);

            const nbpClient = new NbpClient();
            const currencies = await nbpClient.getCurrencies();
            const currencyService = new CurrencyService();
            const filteredCurrencies = await currencyService.getCurrencies(['USD', 'EUR'], currencies[0]);
            return await currencyService.calculate(result.items, filteredCurrencies);
        });
    };

    public addItems = async ({ id }: ParamsRequestDto, items: ItemDto[]): Promise<void> =>
        executeLogic(async () => {
            const result = await this.zombieRepository.findOne(id);
            if (!result) throw new Error(`Zombie with given id ${id} was not found`);

            const mappedItems = items.map(mapToItem);
            result.items = result.items.concat(mappedItems);

            if (hasMoreItemsThanFive<Item>(result.items)) throw new Error('Maximum 5 items allowed per zombie');

            await this.zombieRepository.updateOne(id, result);
        });

    public removeItems = async ({ id }: ParamsRequestDto, items: ItemDto[]): Promise<void> =>
        executeLogic(async () => {
            const result = await this.zombieRepository.findOne(id);
            if (!result) throw new Error(`Zombie with given id ${id} was not found`);

            const { items: zombieItems } = result;
            if (hasNoItems<Item>(zombieItems)) throw new Error('Zombie with no items');

            const filteredItems = zombieItems.filter(({ name }) => hasEqualName(name, items));
            result.items = filteredItems;
            await this.zombieRepository.updateOne(id, result);
        });
}
