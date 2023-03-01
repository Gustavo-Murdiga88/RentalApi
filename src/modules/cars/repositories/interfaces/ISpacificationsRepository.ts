import { Specifications } from "@cars/infra/typeorm/entities/Specification";

export interface ISpecificationsDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ description, name }: ISpecificationsDTO): Promise<Specifications>;
  findByName(name: string): Promise<boolean>;
  findById(ids: string[]): Promise<Specifications[]>;
}
