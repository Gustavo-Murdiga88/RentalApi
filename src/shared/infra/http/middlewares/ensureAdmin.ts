import { Users } from "@Users/infra/typeorm/entities/Users";
import { UserRepository } from "@Users/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";

import { AppErrors } from "@shared/errors/appErros";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user || ({} as Users);

  const userRepository = new UserRepository();

  const user = await userRepository.findById(id);

  if (!user?.admin) {
    throw new AppErrors("user is not admin", 403);
  }

  next();
}
