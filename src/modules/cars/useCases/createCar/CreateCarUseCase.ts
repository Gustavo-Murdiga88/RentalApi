import { CarDTO } from "@cars/dto";
import { Car } from "@cars/infra/typeorm/entities/Car";
import { ICreateCarRepository } from "@cars/repositories/interfaces/ICreateCarRepository";
import { inject, injectable } from "tsyringe";

import { AppErrors } from "@shared/errors/appErros";

@injectable()
export class CreateCarUseCase {
  private carRepository: ICreateCarRepository;

  constructor(
    @inject("CreateCarRepository")
    carRepository: ICreateCarRepository
  ) {
    this.carRepository = carRepository;
  }

  async execute(data: CarDTO): Promise<Car> {
    const license_plateExists = await this.carRepository.findByLicensePlate(
      data.license_plate
    );

    if (license_plateExists?.id) {
      throw new AppErrors("Car already exists");
    }

    return this.carRepository.create(data);
  }
}
