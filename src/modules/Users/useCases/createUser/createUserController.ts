import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./createUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { avatar, driver_license, email, password, name } = req.body;

    const createUserRepository = container.resolve(CreateUserUseCase);

    try {
      const user = await createUserRepository.execute({
        avatar,
        driver_license,
        email,
        password,
        name,
      });

      return res.status(201).send({
        message: "User created successfully",
        user,
      });
    } catch {
      return res.status(400).send({
        message: "user already exists",
      });
    }
  }
}
