import { Handler } from '@game/common/interfaces/handler.interfacer';

import { EnemyLocation } from '../collection/enemy-location.collection';
import { ENEMY_SET } from '../collection/enemy-set.collection';
import { EnemyType } from '../collection/enemy-type.collection';

export class EnmyGetCollectionHandler
  implements Handler<EnemyLocation, EnemyType[]>
{
  handle(location: EnemyLocation): EnemyType[] {
    const sets = ENEMY_SET[location];
    if (!sets || sets.length === 0)
      throw new Error('Set could not be resolved');

    const randomIndex = Math.floor(Math.random() * sets.length);
    return sets[randomIndex];
  }
}
