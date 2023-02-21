import { CategoriesRepositoryInMemory } from "@cars/repositories/in-memory/InMemoryCategoryRepository";
import { AppErrors } from "@shared/errors/appErros";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let createCategoryInMemory: CategoriesRepositoryInMemory;

describe(" should be able create a new category", () => {
  beforeEach(() => {
    createCategoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(createCategoryInMemory);
  });

  it("should be able create one category", async () => {
    const category = {
      description: "Carro 4x4",
      name: "nave das galáxias",
    };

    const newCategory = await createCategoryUseCase.execute(category);

    expect(newCategory).toHaveProperty("id");
  });

  it("should be not able create an category with some name the exists", async () => {
    expect(async () => {
      const category = {
        description: "Carro 4x4",
        name: "nave das galáxias",
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppErrors);
  });
});
