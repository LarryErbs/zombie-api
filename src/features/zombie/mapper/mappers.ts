import { Item } from '../../../common/mongo/entities/item';
import { ItemDto } from '../model/item-dto';
import { ItemViewModel } from '../model/view-model/zombie-view-model';

export const mapToItem = ({ name, value }: ItemDto): Item => {
    return {
        name: name,
        value: value,
    };
};

export const mapToItemViewModel = ({ name, value }: Item): ItemViewModel => {
    return {
        name: name,
        value: value,
    };
};
