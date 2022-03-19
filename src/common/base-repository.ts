/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
export interface IBaseRepository<T> {
    insert(model: T): Promise<T>;
    find(): Promise<T[]>;
    save(model: T): Promise<void>;
    delete(id: string): Promise<void>;
}

export class BaseRepository<T> implements IBaseRepository<T> {
    protected model: Model<T, any, any, any>;

    constructor(model: Model<T, any, any, any>) {
        this.model = model;
    }

    insert = (model: T): Promise<T> => {
        return this.model.create(model);
    }

    find = (): Promise<T[]> => {
        return this.model.find();
    }

    save = async (model: T): Promise<void> => {
        await new this.model(model).save();
    }

    delete = async (id: string): Promise<void> => {
        await this.model.deleteOne({ id });
    }
}
