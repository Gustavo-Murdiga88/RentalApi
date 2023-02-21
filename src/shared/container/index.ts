import { CategoriesRepository } from "@cars/infra/typeorm/repositories/category";
import { SpecificationsRepository } from "@cars/infra/typeorm/repositories/specifications";
import { ICategoriesRepository } from "@cars/repositories/interfaces/ICarRepository";
import { ISpecificationsRepository } from "@cars/repositories/interfaces/ISpacificationsRepository";
import { UserRepository } from "@Users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@Users/repositories/interfaces/Users";
import { container } from "tsyringe";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);
