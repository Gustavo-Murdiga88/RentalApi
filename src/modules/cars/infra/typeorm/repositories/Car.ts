import { CarDTO } from "@cars/dto";
import { Car } from "@cars/infra/entities/Car";
import { ICreateCarRepository } from "@cars/repositories/interfaces/ICreateCarRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/typeorm/data-source";

export class CreateCarRepository implements ICreateCarRepository {
  private cars: Repository<Car>;

  constructor() {
    this.cars = AppDataSource.getRepository(Car);
  }
  async create(data: CarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      ...data,
    });

    await this.cars.save(car);

    return car;
  }

  async findByLicensePlate(
    license_plate: string
  ): Promise<Car | undefined | null> {
    const car = await this.cars.findOneBy({ license_plate });

    return car;
  }
}
