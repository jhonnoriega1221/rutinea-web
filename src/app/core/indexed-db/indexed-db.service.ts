import { Injectable } from "@angular/core";
import { DB_CONFIG } from "./indexed-db.config";

export type StoreName = "habits" | "habitLogs" | "categories";

@Injectable({
  providedIn: "root"
})
export class IndexedDbService {
  private _dbInstance: IDBDatabase | null = null;
  private _connection: Promise<IDBDatabase> | null = null;

  async connect(): Promise<IDBDatabase> {
    if (this._dbInstance) return this._dbInstance;
    if (this._connection) return this._connection;

    this._connection = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = (event.target as IDBOpenDBRequest).transaction!;

        DB_CONFIG.stores.forEach((storeConfig) => {
          let store: IDBObjectStore;

          // Crea los stores en la base de datos si no existen
          if (!db.objectStoreNames.contains(storeConfig.name)) {
            store = db.createObjectStore(storeConfig.name, storeConfig.options);
          } else {
            store = transaction.objectStore(storeConfig.name);
          }

          // Crea los indices si no existen
          if (storeConfig.indexes) {
            storeConfig.indexes.forEach((indexConfig) => {
              if (!store.indexNames.contains(indexConfig.name)) {
                store.createIndex(indexConfig.name, indexConfig.keyPath, indexConfig.options);
              }
            });
          }

          //TODO: Mecanismo automatizado para eliminar stores antiguos sin utilizar
        });
      };

      request.onsuccess = (event) => {
        this._dbInstance = (event.target as IDBOpenDBRequest).result;
        resolve(this._dbInstance);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });

    return this._connection;
  }

  async add<T>(storeName: StoreName, item: T): Promise<T> {
    const db = await this.connect();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    await this._requestToPromise(store.add(item));
    return item;
  }

  async getAll<T>(storeName: StoreName): Promise<T[]> {
    const db = await this.connect();
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    return this._requestToPromise(store.getAll());
  }

  async getById<T>(storeName: StoreName, id: IDBValidKey): Promise<T> {
    const db = await this.connect();
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    return this._requestToPromise(store.get(id));
  }

  async getByIndex<T>(
    storeName: StoreName,
    indexName: string,
    key: IDBValidKey | IDBKeyRange
  ): Promise<T[]> {
    const db = await this.connect();
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    return this._requestToPromise(index.getAll(key));
  }

  async getOneByIndex<T>(
    storeName: StoreName,
    indexName: string,
    key: IDBValidKey | IDBKeyRange
  ): Promise<T | undefined> {
    const db = await this.connect();
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    return this._requestToPromise(index.get(key));
  }

  async update<T>(storeName: StoreName, item: T): Promise<T> {
    const db = await this.connect();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    await this._requestToPromise(store.put(item));
    return item;
  }

  async delete(storeName: StoreName, id: IDBValidKey): Promise<void> {
    const db = await this.connect();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    await this._requestToPromise(store.delete(id));
  }

  async deleteByIndex(
    storeName: StoreName,
    indexName: string,
    key: IDBValidKey | IDBKeyRange
  ): Promise<void> {
    const db = await this.connect();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);

    const primaryKey = await this._requestToPromise(index.getKey(key));

    if (primaryKey !== undefined) {
      await this._requestToPromise(store.delete(primaryKey));
    }
  }

  async count(storeName: StoreName): Promise<number> {
    const db = await this.connect();
    const transaction = db.transaction(storeName);
    const store = transaction.objectStore(storeName);
    return this._requestToPromise(store.count());
  }

  async clear(storeName: StoreName): Promise<void> {
    const db = await this.connect();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    await this._requestToPromise(store.clear());
  }

  private _requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
