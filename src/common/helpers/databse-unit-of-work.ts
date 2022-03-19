/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoDbClient } from '../mongo/mongo-client';
import { IUnitOfWork, UnitOfWorkFactory, UnitOfWorkType } from './unit-of-work-factory';

export const executeLogic = async (fun: () => any) => {
    const unitOfWork = await UnitOfWorkFactory.makeUnitOfWork(UnitOfWorkType.TYPE_DATABASE);
    await unitOfWork.start();

    const work = async () => {
        return fun();
    };

    return unitOfWork.execute(work);
};

export class DatabaseUnitOfWork implements IUnitOfWork {
    private databaseClient!: MongoDbClient;

    async execute(work: () => Promise<any>): Promise<any> {
        try {
            if (!this.databaseClient) {
                throw new Error('Unit of work is not started. Call the start() method');
            }
            return await work();
        } finally {
            await this.stop();
        }
    }

    async stop(): Promise<void> {
        await this.databaseClient.close();
    }

    async start(): Promise<void> {
        this.databaseClient = new MongoDbClient();
        await this.databaseClient.connect();
    }
}
