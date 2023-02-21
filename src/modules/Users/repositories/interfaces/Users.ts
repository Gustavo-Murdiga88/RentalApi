import { Users } from "../../infra/typeorm/entities/Users";

export type UserDTO = {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  avatar: string;
};

export interface IUsersRepository {
  create(data: UserDTO): Promise<Users>;
  update(data: Users): Promise<Users>;
  list(): Promise<Users[]>;
  findByName(name: string): Promise<boolean>;
  findByEmail(email: string): Promise<Users | null>;
  findById(id: string): Promise<Users | null>;
}
