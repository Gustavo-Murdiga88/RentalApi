import { CarDTO } from "@cars/dto";
import { Car } from "@cars/infra/typeorm/entities/Car";
import {
  ICreateCarRepository,
  IRequestListCars,
} from "@cars/repositories/interfaces/ICreateCarRepository";
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

  async listByAvailable({
    category_id,
    brand,
    name,
  }: IRequestListCars): Promise<Car[]> {
    const all = this.cars.createQueryBuilder("cars");

    all.leftJoinAndSelect("cars.category_id", "category");
    all.leftJoinAndSelect("cars.specifications", "specifications");

    if (category_id) {
      all.where("category_id = :category_id", { category_id });
    }

    if (brand) {
      all.andWhere("brand = :brand", { brand });
    }

    if (name) {
      all.andWhere("name = :name", { name });
    }

    const cars = await all.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.cars.findOneBy({ id });

    return car || ({} as Car);
  }

  async update(data: Car): Promise<Car> {
    const car = await this.cars.save(data);

    return car;
  }

  async updateAvailableById(id: string, status: boolean): Promise<void> {
    await this.cars
      .createQueryBuilder()
      .update()
      .set({ available: status })
      .where("id = :id", { id })
      .execute();
  }
}
