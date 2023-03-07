import { CarDTO } from "@cars/dto";
import { Car } from "@cars/infra/typeorm/entities/Car";

export type IRequestListCars = {
  brand?: string;
  name?: string;
  category_id?: string;
};

export interface ICreateCarRepository {
  create(data: CarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined | null>;
  listByAvailable({ category_id, brand }: IRequestListCars): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  update(data: Car): Promise<Car>;
  updateAvailableById(id: string, status: boolean): Promise<void>;
}
