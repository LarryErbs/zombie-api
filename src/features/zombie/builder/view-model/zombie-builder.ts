import { BaseBuilder } from '../../../../common/base-builder';
import { Item } from '../../../../common/mongo/entities/item';
import { Zombie } from '../../../../common/mongo/entities/zombie';
import { ItemViewModel, ZombieViewModel } from '../../model/view-model/zombie-view-model';

export class ZombieBuilder extends BaseBuilder<ZombieViewModel> {
    private zombie: Zombie;

    constructor(zombie: Zombie) {
        super(ZombieViewModel);
        this.zombie = zombie;
    }

    build(): void {
        this.result.name = this.zombie.name;
        this.result.creationDate = this.zombie.creationDate;
        this.result.items = this.buildItems(this.zombie.items)
    }

    buildItems(items: Item[]): ItemViewModel[] {
        return items.map(({ name, value }) => {
            return {
                name: name,
                value: value,
            };
        });
    }
}
