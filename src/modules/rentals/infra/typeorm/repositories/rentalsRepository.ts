import {
  IRentalsRepository,
  IRequestDevolution,
  IRequestRentals,
} from "modules/rentals/repositories/interfaces/IRentalsRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/typeorm/data-source";

import { Rental } from "../entities/rental";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: IRequestRentals): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date().toISOString(),
    });

    const rentalCar = await this.repository.save(rental);

    return rentalCar;
  }

  async findRentalByUser_id(user_id: string): Promise<Rental> {
    const users = await this.repository
      .createQueryBuilder("rentals")
      .leftJoinAndSelect("rentals.user_id", "user")
      .andWhere("user.id = :user_id", { user_id })
      .andWhere("rentals.end_date is null")
      .getMany();

    const user = users.find((item) => !item.end_date);

    return user || ({} as Rental);
  }

  async findRentalByCar_id(car_id: string): Promise<Rental> {
    const car = await this.repository
      .createQueryBuilder("rentals")
      .leftJoinAndSelect("rentals.car_id", "cars")
      .where("rentals.car_id = :car_id", { car_id })
      .andWhere("cars.available = false")
      .getOne();

    return car || ({} as Rental);
  }

  async findById(idRental: string): Promise<Rental> {
    const rental = await this.repository
      .createQueryBuilder("rental")
      .leftJoinAndSelect("rental.car_id", "car")
      .where("rental.id = :idRental", { idRental })
      .getOne();

    return rental || ({} as Rental);
  }

  async updateRental({ id, total }: IRequestDevolution): Promise<Rental> {
    const rental = await this.repository.findOneBy({
      id,
    });

    if (!rental?.id) {
      return {} as Rental;
    }

    Object.assign(rental, {
      total,
      updated_at: new Date().toISOString(),
      end_date: new Date().toISOString(),
    });

    const rentalUpdated = await this.repository.save(rental);

    return rentalUpdated;
  }

  async findRentalsByUserId(id: string): Promise<Rental[]> {
    const rentals = await this.repository
      .createQueryBuilder("rentals")
      .leftJoinAndSelect("rentals.user_id", "user")
      .leftJoinAndSelect("rentals.car_id", "car")
      .where("user.id = :id", { id })
      .getMany();

    return rentals;
  }
}
