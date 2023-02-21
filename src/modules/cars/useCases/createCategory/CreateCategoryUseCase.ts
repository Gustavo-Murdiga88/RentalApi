import "reflect-metadata";

import { Category } from "@cars/infra/entities/Category";
import { ICategoriesRepository } from "@cars/repositories/interfaces/ICarRepository";
import { inject, injectable } from "tsyringe";

import { AppErrors } from "@shared/errors/appErros";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categories: ICategoriesRepository
  ) {}
  async execute({ description, name }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categories.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppErrors("Category already exists");
    }

    const category = await this.categories.create({ name, description });

    return category;
  }
}
