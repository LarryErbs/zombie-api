/* eslint-disable @typescript-eslint/no-var-requires */
import { Zombie } from '../../common/mongo/entities/zombie';
import { ZombieRepository } from '../../common/repositories/zombie-repository';

export class GetZombies {
    public async handle(): Promise<Zombie[]> {
        const zombieRepository = await ZombieRepository.build();
        return zombieRepository.find();
    }
}