/* istanbul ignore file */
export interface Creatable<T = any> {
  create(): Promise<T>
}
