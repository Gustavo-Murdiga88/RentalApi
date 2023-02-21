import {
  ISpecificationsDTO,
  ISpecificationsRepository,
} from "@cars/repositories/interfaces/ISpacificationsRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/typeorm/data-source";

import { Specifications } from "../../entities/Specification";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specifications>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specifications);
  }

  async findByName(name: string): Promise<boolean> {
    const specificationAlreadyExists = await this.repository.findOneBy({
      name,
    });

    return !!specificationAlreadyExists;
  }

  async create({ description, name }: ISpecificationsDTO): Promise<void> {
    const specification = new Specifications();
    specification.name = name;
    specification.description = description;

    await this.repository.save(specification);
  }
}
