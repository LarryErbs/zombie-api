/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
export interface IBaseRepository<T> {
    insert(model: T): Promise<T>;
    find(): Promise<T[]>;
    findOne(id: string): Promise<T>;
    updateOne(id: string, model: T): Promise<void>;
    delete(id: string): Promise<void>;
}

export class BaseRepository<T> implements IBaseRepository<T> {
    protected model: Model<T, any, any, any>;

    constructor(model: Model<T, any, any, any>) {
        this.model = model;
    }

    insert = (model: T): Promise<T> => {
        return this.model.create(model);
    };

    find = (): Promise<T[]> => {
        return this.model.find();
    };

    findOne = (id: string): Promise<T> => {
        return this.model.findOne({ _id: id });
    };

    updateOne = async <K>(id: string, model: K): Promise<void> => {
        console.log(await this.model.updateOne({ _id: id }, model));
    };

    delete = async (id: string): Promise<void> => {
        await this.model.deleteOne({ _id: id });
    };
}
