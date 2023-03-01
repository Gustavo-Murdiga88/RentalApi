import {
  ICategoriesRepository,
  ICategoryDTO,
} from "@cars/repositories/interfaces/ICreateCategoriesRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/typeorm/data-source";

import { Category } from "../entities/Category";

export class CategoriesRepository implements ICategoriesRepository {
  // private categories: Category[];
  private repository: Repository<Category>;

  // eslint-disable-next-line no-use-before-define
  // private static INSTANCE: CategoriesRepository;

  constructor() {
    // this.categories = [];
    this.repository = AppDataSource.getRepository(Category);
  }

  // static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }
  //   return CategoriesRepository.INSTANCE;
  // }

  async create({ description, name }: ICategoryDTO): Promise<Category> {
    const category = new Category();
    category.name = name;
    category.description = description;

    const value = await this.repository.save(category);
    // Object.assign(cat gory, {
    //   name,
    //   description,
    //   created_at: new Date(),
    // });

    // this.categories.push(category);
    // const value = await repository.save(category);
    // return value;
    return value;
  }

  async list(): Promise<Category[]> {
    // const repository = AppDataSource.getRepository(Category);
    // const list = await repository.find();
    // return list;
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<boolean> {
    // const category = this.categories.some((item) => item.name === name);
    // const repository = AppDataSource.getRepository(Category);
    // const category = await repository.findOneBy({ name });
    // return !!category;
    const category = await this.repository.findOneBy({ name });
    return !!category;
  }
}
