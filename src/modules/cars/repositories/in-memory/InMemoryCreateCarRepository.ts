import { CarDTO } from "@cars/dto";
import { Car } from "@cars/infra/entities/Car";
import { ICreateCarRepository } from "@cars/repositories/interfaces/ICreateCarRepository";

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
    const car = await this.cars.find(
      (car) => car.license_plate === license_plate
    );

    return car;
  }
}
