export interface Category {
    id: string;
    name: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UpsertCategoryFormModel = Omit<Category, "id" | "createdAt" | "updatedAt">;
