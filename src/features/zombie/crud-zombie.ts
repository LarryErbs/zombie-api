/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnitOfWorkFactory, UnitOfWorkType } from '../../common/helpers/unit-of-work-factory';
import { ZombieRepository } from '../../common/repositories/zombie-repository';
import { ZombieBuilder } from './builder/view-model/zombie-builder';
import { ZombieDbBuilder } from './builder/zombie-db-builder';
import { ParamsRequestDto } from './models/params-request-dto';
import { ZombieViewModel } from './models/view-model/zombie-view-model';
import { ZombieDto } from './models/zombie-dto';

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

    public async getZombies(): Promise<ZombieViewModel[]> {
        return executeLogic(async () => {
            const result = await this.zombieRepository.find();
            return Promise.all(
                result.map((x) => {
                    const builder = new ZombieBuilder(x);
                    builder.build();
                    return builder.getResult();
                }),
            );
        });
    }

    public async addZombie(model: ZombieDto): Promise<ZombieViewModel> {
        return executeLogic(async () => {
            const builder = new ZombieDbBuilder(model);
            builder.build();
            const result = await this.zombieRepository.insert(await builder.getResult());
            return result;
        });
    }

    public async updateZombie(model: ZombieDto): Promise<void> {
        return executeLogic(async () => {
            const builder = new ZombieDbBuilder(model);
            builder.build();
            const result = await builder.getResult();
            await this.zombieRepository.save(result._id, result);
        });
    }

    public async deleteZombie({ id }: ParamsRequestDto): Promise<void> {
        return executeLogic(async () => this.zombieRepository.delete(id));
    }
}
