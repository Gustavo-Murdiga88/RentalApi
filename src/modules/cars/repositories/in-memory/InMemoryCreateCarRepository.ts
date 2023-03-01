import { CarDTO } from "@cars/dto";
import { Car } from "@cars/infra/typeorm/entities/Car";
import {
  ICreateCarRepository,
  IRequestListCars,
} from "@cars/repositories/interfaces/ICreateCarRepository";

export class CreateCarRepositoryInMemory implements ICreateCarRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  async create(data: CarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      ...data,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async listByAvailable({
    category_id,
    brand,
    name,
  }: IRequestListCars): Promise<Car[]> {
    const cars = this.cars
      .filter(({ available }) => available)
      .filter((item) => {
        if (!category_id && !brand && !name) {
          return item;
        }

        if (
          item.brand === brand ||
          item.name === name ||
          item.category_id === category_id
        ) {
          return item;
        }

        return null;
      });

    return cars;
  }

  async update(data: Car): Promise<Car> {
    const index = this.cars.findIndex((item) => item.id === data.id);

    if (index < 0) {
      return {} as Car;
    }

    this.cars[index] = data;

    return this.cars[index];
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((item) => item.id === id);

    return car || ({} as Car);
  }
}
