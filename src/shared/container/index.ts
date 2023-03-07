import { CreateCarRepository } from "@cars/infra/typeorm/repositories/Car";
import { CarImagesRepository } from "@cars/infra/typeorm/repositories/CarImages";
import { CategoriesRepository } from "@cars/infra/typeorm/repositories/category";
import { SpecificationsRepository } from "@cars/infra/typeorm/repositories/specifications";
import { ICarImagesRepository } from "@cars/repositories/interfaces/ICarImagesRepository";
import { ICreateCarRepository } from "@cars/repositories/interfaces/ICreateCarRepository";
import { ICategoriesRepository } from "@cars/repositories/interfaces/ICreateCategoriesRepository";
import { ISpecificationsRepository } from "@cars/repositories/interfaces/ISpacificationsRepository";
import { UserRepository } from "@Users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@Users/repositories/interfaces/Users";
import { RentalsRepository } from "modules/rentals/infra/typeorm/repositories/rentalsRepository";
import { IRentalsRepository } from "modules/rentals/repositories/interfaces/IRentalsRepository";
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

container.registerSingleton<ICreateCarRepository>(
  "CreateCarRepository",
  CreateCarRepository
);

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);
