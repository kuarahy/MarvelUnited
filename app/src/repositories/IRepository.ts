export interface IRepository<T> {
  getAll(): T[]
  getById(id: string): T | undefined
}
