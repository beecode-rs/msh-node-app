/* istanbul ignore file */
export interface Executable<T = any> {
  execute(): Promise<T>
}
