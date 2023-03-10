import { Category } from "@cars/infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICategoryDTO,
} from "@cars/repositories/interfaces/ICreateCategoriesRepository";
import { randomUUID } from "crypto";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create({ description, name }: ICategoryDTO): Promise<Category> {
    const category = {
      description,
      name,
      id: randomUUID(),
      created_at: new Date(),
    };

    this.categories.push(category);

    return category;
  }
  async list(): Promise<Category[]> {
    const list = this.categories;

    return list;
  }

  async findByName(name: string): Promise<boolean> {
    const category = this.categories.find((item) => item.name === name);

    return !!category;
  }
}
