import { Users } from "@Users/infra/typeorm/entities/Users";
import {
  IUsersRepository,
  UserDTO,
} from "@Users/repositories/interfaces/Users";
import { randomUUID } from "crypto";

export class UsersInMemoryRepository implements IUsersRepository {
  private users: Users[];

  constructor() {
    this.users = [];
  }

  async create(data: UserDTO): Promise<Users> {
    const user = {
      ...data,
      admin: false,
      id: randomUUID(),
      created_at: new Date(),
    } as Users;

    this.users.push(user);

    return user;
  }

  async update(data: Users): Promise<Users> {
    const user = this.users.findIndex((item) => item.id === data.id);

    if (user) {
      this.users[user] = data;
    }
    return this.users[user];
  }

  async list(): Promise<Users[]> {
    return this.users;
  }

  async findByName(name: string): Promise<boolean> {
    const user = this.users.find((item) => item.name === name);
    return !!user;
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = this.users.find((item) => item.email === email);
    if (user) return user;

    return null;
  }

  async findById(id: string): Promise<Users | null> {
    const user = this.users.find((item) => item.id === id);
    if (user) return user;

    return null;
  }
}
