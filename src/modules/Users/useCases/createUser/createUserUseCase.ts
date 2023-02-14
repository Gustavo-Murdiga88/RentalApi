import { inject, injectable } from "tsyringe";

import { AppErrors } from "../../../../errors/appErros";
import { Users } from "../../entities/Users";
import { IUsersRepository, UserDTO } from "../../repositories/interfaces/Users";

@injectable()
export class CreateUserUseCase {
  private user: IUsersRepository;

  constructor(
    @inject("UserRepository")
    user: IUsersRepository
  ) {
    this.user = user;
  }

  async execute({
    avatar,
    email,
    driver_license,
    name,
    password,
  }: UserDTO): Promise<Users> {
    const userAlreadyExists = await this.user.findByName(name);

    if (userAlreadyExists) {
      throw new AppErrors("User Already Exists");
    }
    return this.user.create({
      avatar,
      email,
      driver_license,
      name,
      password,
    });
  }
}
