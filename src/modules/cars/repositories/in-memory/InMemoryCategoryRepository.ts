import { Category } from "@cars/infra/entities/Category";
import { randomUUID } from "crypto";
import {
  ICategoriesRepository,
  ICategoryDTO,
} from "modules/cars/repositories/interfaces/ICarRepository";

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
