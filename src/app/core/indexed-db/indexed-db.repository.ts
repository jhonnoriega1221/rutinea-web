export type StoreRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type IndexedDbConfig = {
  dbName: string;
  version: number;
  storeName: string;
};

export abstract class IndexedDbRepository<T extends StoreRecord> {
  protected constructor(
    private readonly config: IndexedDbConfig,
    private readonly onUpgrade?: (db: IDBDatabase) => void
  ) {}

  protected openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.dbName, this.config.version);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(this.config.storeName)) {
          const store = db.createObjectStore(this.config.storeName, {
            keyPath: "id"
          });

          store.createIndex("createdAt", "createdAt", { unique: false });
        }

        this.onUpgrade?.(db);
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error("IndexedDB open failed"));
    });
  }

  protected async withStore<R>(
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => Promise<R> | R
  ): Promise<R> {
    const db = await this.openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.config.storeName, mode);
      const store = tx.objectStore(this.config.storeName);

      Promise.resolve(callback(store))
        .then((result) => {
          tx.oncomplete = () => resolve(result);
        })
        .catch((error) => reject(error));

      tx.onerror = () => reject(tx.error ?? new Error("IndexedDB transaction failed"));
    });
  }

  async create(entity: T): Promise<T> {
    const record = {
      ...entity,
      createdAt: entity.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.withStore("readwrite", async (store) => {
      store.put(record);
    });

    return record;
  }

  async getAll(): Promise<T[]> {
    return this.withStore("readonly", (store) => {
      return new Promise<T[]>((resolve, reject) => {
        const request = store.getAll();

        request.onsuccess = () => resolve((request.result ?? []) as T[]);
        request.onerror = () => reject(request.error ?? new Error("IndexedDB getAll failed"));
      });
    });
  }

  async getById(id: string): Promise<T | null> {
    return this.withStore("readonly", (store) => {
      return new Promise<T | null>((resolve, reject) => {
        const request = store.get(id);

        request.onsuccess = () => {
          resolve((request.result ?? null) as T | null);
        };
        request.onerror = () => reject(request.error ?? new Error("IndexedDB getById failed"));
      });
    });
  }

  async update(id: string, changes: Partial<T>): Promise<T> {
    const current = await this.getById(id);

    if (!current) {
      throw new Error(`Record with id ${id} not found`);
    }

    const updated = {
      ...current,
      ...changes,
      id,
      updatedAt: new Date().toISOString()
    } as T;

    await this.withStore("readwrite", (store) => {
      store.put(updated);
    });

    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.withStore("readwrite", (store) => {
      store.delete(id);
    });
  }
}
