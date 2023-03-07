import { ICreateCarRepository } from "@cars/repositories/interfaces/ICreateCarRepository";
import { differenceInHours } from "date-fns";
import { Rental } from "modules/rentals/infra/typeorm/entities/rental";
import {
  IRentalsRepository,
  IRequestRentals,
} from "modules/rentals/repositories/interfaces/IRentalsRepository";
import { inject, injectable } from "tsyringe";
import { DateUpdate } from "utils/date";

import { AppErrors } from "@shared/errors/appErros";

@injectable()
export class CreateRentalUseCase {
  private rentalRepository: IRentalsRepository;

  private carsRepository: ICreateCarRepository;

  constructor(
    @inject("RentalsRepository")
    rental: IRentalsRepository,
    @inject("CreateCarRepository")
    car: ICreateCarRepository
  ) {
    this.rentalRepository = rental;
    this.carsRepository = car;
  }

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequestRentals): Promise<Rental> {
    const hasRentalOpenForThisCar =
      await this.rentalRepository.findRentalByCar_id(car_id);

    if (hasRentalOpenForThisCar.car_id) {
      throw new AppErrors(
        "it is not possible to continue with rental, car already has rental register"
      );
    }

    const hasRentalOpenForThisUser =
      await this.rentalRepository.findRentalByUser_id(user_id);

    if (hasRentalOpenForThisUser.user_id) {
      throw new AppErrors(
        "it is not possible to continue with rental, user already has rental register"
      );
    }

    const startDate = DateUpdate();
    const endDate = DateUpdate(expected_return_date);

    const totalOfDaysPerRental = differenceInHours(endDate, startDate);

    if (totalOfDaysPerRental < 24) {
      throw new AppErrors(
        "Should be not able create rental with time smaller than 24hours"
      );
    }

    const rental = await this.rentalRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    await this.carsRepository.updateAvailableById(car_id, false);

    return rental;
  }
}
