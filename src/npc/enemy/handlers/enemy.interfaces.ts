export interface EnemyHandler<T = void, R = void> {
  handle(input?: T): R;
}
