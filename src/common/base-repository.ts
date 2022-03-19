import { DataSource, Repository, DeleteResult, UpdateResult, InsertResult } from 'typeorm';
import { MongoDbClient } from './mongo/mongo-client';

export interface IBaseRepository<T> {
    insert(model: T): Promise<InsertResult>;
    find(): Promise<T[]>;
    update(id: string, model: T): Promise<UpdateResult>;
    delete(id: string): Promise<DeleteResult>;
}

export class BaseRepository<T> implements IBaseRepository<T> {
    protected mongoDbClient: MongoDbClient;
    protected dataSource: Promise<DataSource>;
    protected repository!: Repository<T>;

    constructor() {
        this.mongoDbClient = new MongoDbClient();
        this.dataSource = this.mongoDbClient.connect();
    }

    async insert(model: T): Promise<InsertResult> {
        this.repository = (await this.dataSource).getRepository(model as any);
        return this.repository.insert(model);
    }

    find(): Promise<T[]> {
        return this.repository.find();
    }

    update(id: string, model: T): Promise<UpdateResult> {
        return this.repository.update(id, model);
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}
