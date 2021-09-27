/* istanbul ignore file */
export interface Destructible<T = any> {
  destroy(): Promise<T>
}
