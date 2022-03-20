/* eslint-disable @typescript-eslint/no-explicit-any */
import { executeLogic } from '../../common/helpers/databse-unit-of-work';
import { ZombieRepository } from '../../common/repositories/zombie-repository';
import { ZombieBuilder } from './builder/view-model/zombie-builder';
import { ZombieDbBuilder } from './builder/zombie-db-builder';
import { ParamsRequestDto } from './model/params-request-dto';
import { ZombieViewModel } from './model/view-model/zombie-view-model';
import { ZombieDto } from './model/zombie-dto';

interface ICrudZombie {
    getZombies(): Promise<ZombieViewModel[]>;
    addZombie(model: ZombieDto): Promise<ZombieViewModel>;
    updateZombie({ id }: ParamsRequestDto, model: ZombieDto): Promise<void>;
    deleteZombie({ id }: ParamsRequestDto): Promise<void>;
}

export class CrudZombie implements ICrudZombie {
    private zombieRepository!: ZombieRepository;

    constructor() {
        this.zombieRepository = new ZombieRepository();
    }

    public getZombies = async (): Promise<ZombieViewModel[]> =>
        executeLogic(async () => {
            const result = await this.zombieRepository.find();
            return Promise.all(
                result.map((x) => {
                    const builder = new ZombieBuilder(x);
                    builder.build();
                    return builder.getResult();
                }),
            );
        });

    public addZombie = async (model: ZombieDto): Promise<ZombieViewModel> =>
        executeLogic(async () => {
            const builder = new ZombieDbBuilder(model);
            builder.build();
            return this.zombieRepository.insert(await builder.getResult());
        });

    public updateZombie = async ({ id }: ParamsRequestDto, model: ZombieDto): Promise<void> =>
        executeLogic(async () => {
            const result = await this.zombieRepository.findOne(id);
            Object.assign(result, model);
            await this.zombieRepository.updateOne<ZombieDto>(id, result);
        });

    public deleteZombie = async ({ id }: ParamsRequestDto): Promise<void> =>
        executeLogic(async () => this.zombieRepository.delete(id));
}
