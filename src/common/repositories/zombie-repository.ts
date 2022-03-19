import { BaseRepository } from '../base-repository';
import { Zombie } from '../mongo/entities/zombie';

export class ZombieRepository extends BaseRepository<Zombie>{
    
    constructor() {
        super();
    }

    static async build(): Promise<ZombieRepository> {
        const repo = new ZombieRepository();
        repo.repository = (await repo.dataSource).getRepository(Zombie);
        return repo;
    }
}
