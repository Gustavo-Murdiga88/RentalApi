import { AppErrors } from "@shared/errors/appErros";
import { inject, injectable } from "tsyringe";

import {
  ISpecificationsDTO,
  ISpecificationsRepository,
} from "../../repositories/interfaces/ISpacificationsRepository";

@injectable()
export class CreateSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({ description, name }: ISpecificationsDTO) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppErrors("Specification already exists");
    }

    await this.specificationsRepository.create({ description, name });
  }
}
