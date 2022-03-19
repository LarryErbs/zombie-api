import { BaseBuilder } from '../../../common/base-builder';
import { Zombie, zombieDbModel } from '../../../common/mongo/entities/zombie';
import { ZombieDto } from '../model/zombie-dto';
import moment from 'moment';

export class ZombieDbBuilder extends BaseBuilder<Zombie> {
    private zombieDto: ZombieDto;
        
    constructor(zombieDto: ZombieDto) {
        super(zombieDbModel);
        this.zombieDto = zombieDto;
    }

    build(): void {
        this.result.name = this.zombieDto.name;
        this.result.creationDate = moment().format();
    }
}
