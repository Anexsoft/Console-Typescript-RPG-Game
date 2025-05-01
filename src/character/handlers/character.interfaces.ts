export interface CharacterHandler<T = void, R = void> {
  handle(input?: T): R;
}
