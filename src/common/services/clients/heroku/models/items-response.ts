export interface Items {
    timestamp: number;
    items:     Item[];
}

export interface Item {
    id:    number;
    name:  string;
    price: number;
}