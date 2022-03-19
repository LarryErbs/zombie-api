import { BaseRepository } from '../base-repository';
import { Zombie, zombieDbModel } from '../mongo/entities/zombie';

export class ZombieRepository extends BaseRepository<Zombie>{
    constructor() {
        super(zombieDbModel);
    }
}
