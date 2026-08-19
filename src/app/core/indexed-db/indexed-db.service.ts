import { Injectable } from "@angular/core";

export type StoreName = "habits" | "records" | "categories";

@Injectable({
  providedIn: "root"
})
export class IndexedDbService {
  private readonly _dbName = "HabitsAppDB";
  private readonly _dbVersion = 1;
  private readonly _stores: StoreName[] = ["habits", "records"];

  private _dbInstance: IDBDatabase | null = null;
  private _connection: Promise<IDBDatabase> | null = null;

  async connect(): Promise<IDBDatabase> {
    if (this._dbInstance) return this._dbInstance;
    if (this._connection) return this._connection;

    this._connection = new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, this._dbVersion);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this._stores.forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "id" });
          }
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
