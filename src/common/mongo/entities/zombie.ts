import { Schema, model } from 'mongoose';
export interface Zombie {
    _id: string;
    name: string;
    creationDate: string;
}

const zombieSchema = new Schema<Zombie>({
    _id: String,
    name: String,
    creationDate: String,
});

export const zombieDbModel = model<Zombie>('zombies', zombieSchema);
