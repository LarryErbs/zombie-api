/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
export interface IBaseRepository<T> {
    insert(model: T): Promise<T>;
    find(): Promise<T[]>;
    save(id: string, model: T): Promise<void>;
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

    save = async (id: string, model: T): Promise<void> => {
        await this.model.updateOne({ _id: id }, model);
    }

    delete = async (id: string): Promise<void> => {
        await this.model.deleteOne({ _id: id });
    }
}
