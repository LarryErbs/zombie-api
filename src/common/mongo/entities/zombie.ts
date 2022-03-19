import { Schema, model } from 'mongoose';
import { Item, itemSchema } from './item';
export interface Zombie {
    id: string;
    name: string;
    creationDate: string;
    items: Item[];
}

const zombieSchema = new Schema<Zombie>({
    id: String,
    name: String,
    creationDate: String,
    items: [
        itemSchema
    ],
});

export const zombieDbModel = model<Zombie>('zombies', zombieSchema);
