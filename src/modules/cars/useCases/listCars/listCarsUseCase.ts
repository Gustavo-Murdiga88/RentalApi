import { Car } from "@cars/infra/typeorm/entities/Car";
import {
  ICreateCarRepository,
  IRequestListCars,
} from "@cars/repositories/interfaces/ICreateCarRepository";
import { inject, injectable } from "tsyringe";

import { AppErrors } from "@shared/errors/appErros";

@injectable()
export class ListCarsUseCase {
  private car: ICreateCarRepository;
  constructor(
    @inject("CreateCarRepository")
    car: ICreateCarRepository
  ) {
    this.car = car;
  }

  async execute({
    category_id,
    brand,
    name,
  }: IRequestListCars): Promise<Car[]> {
    const cars = await this.car.listByAvailable({
      category_id,
      brand,
      name,
    });

    if (!cars) {
      throw new AppErrors("not should be find cars with params");
    }

    return cars;
  }
}
