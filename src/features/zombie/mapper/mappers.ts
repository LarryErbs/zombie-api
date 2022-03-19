import { Item } from '../../../common/mongo/entities/item';
import { ItemDto } from '../model/item-dto';

export const mapItem = ({ name, value }: ItemDto): Item => {
    return {
        name: name,
        value: value,
    };
};
