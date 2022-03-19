export interface ZombieViewModel {
    name: string;
    creationDate: string;
    items: ItemViewModel[];
}

export interface ItemViewModel {
    name: string;
    value: number;
}

export class ZombieViewModel implements ZombieViewModel {}