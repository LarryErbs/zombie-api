/* eslint-disable @typescript-eslint/no-var-requires */
import { InsertResult } from 'typeorm';
import { Zombie } from '../../common/mongo/entities/zombie';
import { ZombieRepository } from '../../common/repositories/zombie-repository';

export class AddZombie {
    public async handle(model: Zombie): Promise<InsertResult> {
        const zombieRepository = await ZombieRepository.build();
        return zombieRepository.insert(model);
    }
}
