export type StoreName = "habits" | "habitLogs" | "categories";

export interface IndexConfig {
  name: string;
  keyPath: string | string[];
  options?: IDBIndexParameters;
}

export interface StoreConfig {
  name: StoreName;
  options: IDBObjectStoreParameters;
  indexes?: IndexConfig[];
}

export const DB_CONFIG = {
  name: "HabitsAppDB",
  version: 1,
  stores: [
    {
      name: "habits",
      options: { keyPath: "id" }
    },
    {
      name: "categories",
      options: { keyPath: "id" }
    },
    {
      name: "habitLogs",
      options: { keyPath: "id" },
      indexes: [
        {
          name: "habitId_date",
          keyPath: ["habitId", "date"],
          options: { unique: true }
        }
      ]
    }
  ] as StoreConfig[]
};
