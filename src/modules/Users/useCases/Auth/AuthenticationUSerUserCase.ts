import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppErrors } from "../../../../errors/appErros";
import { Users } from "../../entities/Users";
import { IUsersRepository } from "../../repositories/interfaces/Users";

type ResponseAuth = {
  user: Users;
  token: string;
};

type Request = {
  email: string;
  password: string;
};

@injectable()
export class AuthenticationUseCase {
  repository: IUsersRepository;

  constructor(
    @inject("UserRepository")
    UserRepository: IUsersRepository
  ) {
    this.repository = UserRepository;
  }

  async execute({ email, password }: Request): Promise<ResponseAuth> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppErrors("Email or password incorrect");
    }

    const match = compare(password, user.password);

    if (!match) {
      throw new AppErrors("Email or password incorrect");
    }

    const token = sign({}, "f34fa5ab9805c87d7a19050d14486e82", {
      expiresIn: 60 * 60 * 24, // 1 day
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}
