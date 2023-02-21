import { Category } from "../../infra/entities/Category";

export type ICategoryDTO = {
  name: string;
  description: string;
};

export interface ICategoriesRepository {
  create({ description, name }: ICategoryDTO): Promise<Category>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<boolean>;
}
