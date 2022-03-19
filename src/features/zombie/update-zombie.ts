/* eslint-disable @typescript-eslint/no-var-requires */
import { UpdateResult } from 'typeorm';
import { Zombie } from '../../common/mongo/entities/zombie';
import { ZombieRepository } from '../../common/repositories/zombie-repository';

export class UpdateZombie {
    public async handle(model: Zombie): Promise<UpdateResult> {
        const zombieRepository = await ZombieRepository.build();
        return zombieRepository.update(model.id, model);
    }
}
