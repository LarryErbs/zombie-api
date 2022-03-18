import { DataSource } from 'typeorm';
import ormconfig from './ormconfig';

export class MongoDbClient {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = new DataSource(ormconfig);
    }

    async connect(): Promise<DataSource> {
        return this.dataSource.initialize();
    }
    
    async close(): Promise<void> {
        await this.dataSource.destroy();
    }
}
