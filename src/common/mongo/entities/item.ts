import { Schema } from 'mongoose';
export interface Item {
    name: string;
    value: number;
}


export const itemSchema = new Schema<Item>({
    name: String,
    value: Number,
});
