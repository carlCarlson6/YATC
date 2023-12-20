export type AppCache = {
  read: <T>(id: string) => Promise<T|null>
  upsert: <T>(id: string, obj: T) => Promise<void>
}