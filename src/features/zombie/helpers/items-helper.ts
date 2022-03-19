import { isEqual } from 'lodash';

export const hasMoreItemsThanFive = <T>(arr: T[]): boolean => arr.length > 5;
export const hasNoItems = <T>(arr: T[]): boolean => isEqual(arr.length, 0);
