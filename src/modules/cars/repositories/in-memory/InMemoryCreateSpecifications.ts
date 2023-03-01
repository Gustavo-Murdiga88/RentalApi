import { Specifications } from "@cars/infra/typeorm/entities/Specification";
import { randomUUID } from "crypto";

import {
  ISpecificationsDTO,
  ISpecificationsRepository,
} from "../interfaces/ISpacificationsRepository";

export class CreateSpecificationsInMemory implements ISpecificationsRepository {
  private specifications: Specifications[];

  constructor() {
    this.specifications = [];
  }
  async findById(ids: string[]): Promise<Specifications[]> {
    const specifications = this.specifications.filter((item) =>
      ids.includes(item.id)
    );

    return specifications;
  }

  async create({
    description,
    name,
  }: ISpecificationsDTO): Promise<Specifications> {
    const specification = {
      description,
      name,
      created_at: new Date(),
      id: randomUUID(),
    };

    this.specifications.push(specification);
    return specification;
  }

  async findByName(name: string): Promise<boolean> {
    const specification = this.specifications.find(
      (item) => item.name === name
    );

    return !!specification;
  }
}
