import { container } from "tsyringe";

import { CategoriesRepository } from "../../modules/cars/repositories/implementations/category";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/specifications";
import { ICategoriesRepository } from "../../modules/cars/repositories/interfaces/ICarRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/interfaces/ISpacificationsRepository";
import { UserRepository } from "../../modules/Users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/Users/repositories/interfaces/Users";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);
