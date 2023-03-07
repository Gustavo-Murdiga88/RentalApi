import { ICreateCarRepository } from "@cars/repositories/interfaces/ICreateCarRepository";
import { differenceInDays } from "date-fns";
import { IRentalsRepository } from "modules/rentals/repositories/interfaces/IRentalsRepository";
import { inject, injectable } from "tsyringe";
import { DateUpdate } from "utils/date";

import { AppErrors } from "@shared/errors/appErros";

export type IRequestDevolution = {
  idRental: string;
};

@injectable()
export class DevolutionUseCase {
  private rentalRepository: IRentalsRepository;
  private carRepository: ICreateCarRepository;

  constructor(
    @inject("RentalsRepository")
    rental: IRentalsRepository,
    @inject("CreateCarRepository")
    car: ICreateCarRepository
  ) {
    this.rentalRepository = rental;
    this.carRepository = car;
  }

  async execute({ idRental }: IRequestDevolution) {
    const rental = await this.rentalRepository.findById(idRental);

    if (!rental.id) {
      throw new AppErrors("rental not exists");
    }

    const { car_id, expected_return_date, start_date, id } = rental;
    console.log(rental);

    const car = await this.carRepository.findById(car_id.id);

    if (!car.id) {
      throw new AppErrors("Car not exist in rental");
    }

    const { fine_amount, daily_rate } = car;
    const minimumDaily = daily_rate;

    const now = DateUpdate();
    const startDate = DateUpdate(start_date);
    const end_date = DateUpdate(expected_return_date);

    const dailyAmountDays = differenceInDays(end_date, startDate);
    const diffInDays = differenceInDays(now, end_date);

    let total = 0;
    let dailyAmount = 0;
    let fineAmount = 0;

    if (dailyAmountDays) {
      const daily = daily_rate * dailyAmountDays;
      dailyAmount = daily;
    }

    if (dailyAmountDays <= 0) {
      total = minimumDaily;
    }

    if (diffInDays >= 1) {
      fineAmount = diffInDays * fine_amount;
    }

    total += dailyAmount + fineAmount;

    const rentalUpdated = await this.rentalRepository.updateRental({
      id,
      total,
    });

    await this.carRepository.updateAvailableById(car.id, true);

    return rentalUpdated;
  }
}
