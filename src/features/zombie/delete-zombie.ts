/* eslint-disable @typescript-eslint/no-var-requires */
import { DeleteResult } from 'typeorm';
import { ZombieRepository } from '../../common/repositories/zombie-repository';
import { ParamsRequest } from './models/params-request';

export class DeleteZombie {
    public async handle({ id }: ParamsRequest): Promise<DeleteResult> {
        const zombieRepository = await ZombieRepository.build();
        return zombieRepository.delete(id);
    }
}
