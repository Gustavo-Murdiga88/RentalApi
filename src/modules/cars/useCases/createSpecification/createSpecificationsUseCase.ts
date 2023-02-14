import { inject, injectable } from "tsyringe";

import { AppErrors } from "../../../../errors/appErros";
import {
  ISpecificationsRepository,
  ISpecificationsDTO,
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
