export interface ISpecificationsDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ description, name }: ISpecificationsDTO): Promise<void>;
  findByName(name: string): Promise<boolean>;
}
