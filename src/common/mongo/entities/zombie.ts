import { Schema, model } from 'mongoose';
export interface Zombie {
    id: string;
    name: string;
    creationDate: string;
}

const zombieSchema = new Schema<Zombie>({
    name: String,
    creationDate: String,
});

export const zombieDbModel = model<Zombie>('zombies', zombieSchema);
