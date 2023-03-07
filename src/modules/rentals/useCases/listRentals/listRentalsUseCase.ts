import { IRentalsRepository } from "modules/rentals/repositories/interfaces/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRentalsUseCase {
  private rentalsRepository: IRentalsRepository;

  constructor(
    @inject("RentalsRepository")
    rentals: IRentalsRepository
  ) {
    this.rentalsRepository = rentals;
  }

  async execute(idUser: string) {
    const rentals = await this.rentalsRepository.findRentalsByUserId(idUser);

    return rentals;
  }
}
