import { CarDTO } from "@cars/dto";
import { Car } from "@cars/infra/entities/Car";

export interface ICreateCarRepository {
  create(data: CarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined | null>;
}
