import { isEqual } from 'lodash';
import { executeLogic } from '../../common/helpers/databse-unit-of-work';
import { Item } from '../../common/mongo/entities/item';
import { ZombieRepository } from '../../common/repositories/zombie-repository';
import { hasMoreItemsThanFive, hasNoItems } from './helpers/items-helper';
import { mapItem } from './mapper/mappers';
import { ItemDto } from './model/item-dto';
import { ParamsRequestDto } from './model/params-request-dto';

export class ZombieItems {
    private zombieRepository!: ZombieRepository;

    constructor() {
        this.zombieRepository = new ZombieRepository();
    }

    public addItems = async ({ id }: ParamsRequestDto, items: ItemDto[]): Promise<void> =>
        executeLogic(async () => {
            const result = await this.zombieRepository.findOne(id);
            if (!result) throw new Error(`Zombie with given id ${id} was not found`);

            const { items: zombieItems } = result;
            const mappedItems = items.map(mapItem);
            Object.assign(zombieItems, mappedItems);
            if (hasMoreItemsThanFive<Item>(zombieItems)) throw new Error('Maximum 5 items allowed per zombie');

            await this.zombieRepository.updateOne(id, result);
        });

    public removeItems = async ({ id }: ParamsRequestDto, items: ItemDto[]): Promise<void> =>
        executeLogic(async () => {
            const result = await this.zombieRepository.findOne(id);
            if (!result) throw new Error(`Zombie with given id ${id} was not found`);

            const { items: zombieItems } = result;
            if (hasNoItems<Item>(zombieItems)) throw new Error('Zombie with no items');
            
            const filteredItems = zombieItems.filter(({ name }) => !items.some(({ name: mappedName }) => isEqual(name, mappedName)));
            result.items = filteredItems;
            await this.zombieRepository.updateOne(id, result);
        });

}
