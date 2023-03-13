import {
  IUsersRepository,
  UserDTO,
} from "@Users/repositories/interfaces/Users";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/typeorm/data-source";

import { Users } from "../entities/Users";

export class UserRepository implements IUsersRepository {
  private repository: Repository<Users>;

  constructor() {
    this.repository = AppDataSource.getRepository(Users);
  }

  async create({
    avatar,
    driver_license,
    email,
    password,
    name,
  }: UserDTO): Promise<Users> {
    const hash = await bcrypt.hash(password, 8);

    const user = this.repository.create({
      avatar,
      driver_license,
      email,
      password: hash,
      name,
    });

    const data = await this.repository.save(user);

    return data;
  }

  async list(): Promise<Users[]> {
    const users = await this.repository.find();

    return users;
  }

  async findByName(name: string): Promise<boolean> {
    const user = await this.repository.findOneBy({
      name,
    });

    return !!user;
  }

  async update(data: Users): Promise<Users> {
    const user = await this.repository.save(data);
    return user;
  }

  async findById(id: string): Promise<Users | null> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }
}
