import { Category } from "@cars/infra/entities/Category";
import { ICategoriesRepository } from "@cars/repositories/interfaces/ICarRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListsCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const list = await this.categoriesRepository.list();

    return list;
  }
}
