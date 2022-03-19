import { BaseBuilder } from '../../../common/base-builder';
import { Zombie, zombieDbModel } from '../../../common/mongo/entities/zombie';
import { ZombieDto } from '../models/zombie-dto';

export class ZombieDbBuilder extends BaseBuilder<Zombie> {
    private zombieDto: ZombieDto;
        
    constructor(zombieDto: ZombieDto) {
        super(zombieDbModel);
        this.zombieDto = zombieDto;
    }

    build(): void {
        Object.assign(this.result, this.zombieDto);
    }
}
