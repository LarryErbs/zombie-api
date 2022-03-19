import { BaseBuilder } from '../../../../common/base-builder';
import { Zombie } from '../../../../common/mongo/entities/zombie';
import { ZombieViewModel } from '../../model/view-model/zombie-view-model';

export class ZombieBuilder extends BaseBuilder<ZombieViewModel> {
    private zombie: Zombie;

    constructor(zombie: Zombie) {
        super(ZombieViewModel);
        this.zombie = zombie;
    }

    build(): void {
        this.result.name = this.zombie.name;
        this.result.creationDate = this.zombie.creationDate;
    }
}
