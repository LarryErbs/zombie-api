/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnitOfWorkFactory, UnitOfWorkType } from '../../common/helpers/unit-of-work-factory';
import { Zombie } from '../../common/mongo/entities/zombie';
import { ZombieRepository } from '../../common/repositories/zombie-repository';
import { ParamsRequest } from './models/params-request';

const executeLogic = async (fun: () => any) => {
    const unitOfWork = await UnitOfWorkFactory.makeUnitOfWork(UnitOfWorkType.TYPE_DATABASE);
    await unitOfWork.start();

    const work = async () => {
        return fun();
    };

    return unitOfWork.execute(work);
};

export class CrudZombie {
    private zombieRepository!: ZombieRepository;

    constructor() {
        this.zombieRepository = new ZombieRepository();
    }
    public async getZombies(): Promise<Zombie[]> {
        return executeLogic(this.zombieRepository.find);
    }

    public async addZombie(model: Zombie): Promise<Zombie> {
        return executeLogic(() => this.zombieRepository.insert(model));
    }

    public async updateZombie(model: Zombie): Promise<void> {
        return executeLogic(() => this.zombieRepository.save(model));
    }

    public async deleteZombie({ id }: ParamsRequest): Promise<void> {
        return executeLogic(() => this.zombieRepository.delete(id));
    }
}
