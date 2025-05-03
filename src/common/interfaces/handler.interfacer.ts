export interface Handler<T = void, R = void> {
  handle(input?: T): R;
}
