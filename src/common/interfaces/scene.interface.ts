export interface SceneHandler {
  handle(input?): Promise<void>;
}
