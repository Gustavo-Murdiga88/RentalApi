import { Car } from "@cars/infra/typeorm/entities/Car";
import { ICreateCarRepository } from "@cars/repositories/interfaces/ICreateCarRepository";
import { ISpecificationsRepository } from "@cars/repositories/interfaces/ISpacificationsRepository";
import { inject, injectable } from "tsyringe";

import { AppErrors } from "@shared/errors/appErros";

export type IRequestCreateSpecification = {
  car_id: string;
  specifications_id: string[];
};

@injectable()
export class CreateCarSpecificationUseCase {
  private specifications: ISpecificationsRepository;
  private cars: ICreateCarRepository;

  constructor(
    @inject("SpecificationsRepository")
    specification: ISpecificationsRepository,
    @inject("CreateCarRepository")
    car: ICreateCarRepository
  ) {
    this.specifications = specification;
    this.cars = car;
  }

  async execute({
    car_id,
    specifications_id,
  }: IRequestCreateSpecification): Promise<Car> {
    const car = await this.cars.findById(car_id);

    if (!car.id) {
      throw new AppErrors("car not exists");
    }

    const specifications = await this.specifications.findById(
      specifications_id
    );

    car.specifications = specifications;

    const carUpdated = await this.cars.update(car);

    return carUpdated;
  }
}
