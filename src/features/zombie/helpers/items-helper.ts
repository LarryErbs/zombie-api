import { isEqual } from 'lodash';
import { ItemDto } from '../model/item-dto';

export const hasMoreItemsThanFive = <T>(arr: T[]): boolean => arr.length > 5;
export const hasNoItems = <T>(arr: T[]): boolean => isEqual(arr.length, 0);
export const hasEqualName = (name: string, arr: ItemDto[]): boolean => !arr.some(({ name: mappedName }) => isEqual(name, mappedName));