/* eslint-disable @typescript-eslint/no-var-requires */
import { Zombie } from '../../common/mongo/entities/zombie';
import { MongoDbClient } from '../../common/mongo/mongo-client';

export class GetZombies {
    public async handle(): Promise<void> {
        const mongoClient = new MongoDbClient();
        const dataSource = await mongoClient.connect();

        const zombieRepository = dataSource.getRepository(Zombie);
        zombieRepository.save({
            name: 'Test',
        } as Zombie)
        // const t = await zombieRepository.find();
        // console.log(t);
    }
}
