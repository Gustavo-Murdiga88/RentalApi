import { UserRepository } from "@Users/infra/typeorm/repositories/UsersRepository";
import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppErrors } from "@shared/errors/appErros";

type DecodedProps = {
  sub: string;
};

export async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppErrors("Invalid token!", 401);
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "f34fa5ab9805c87d7a19050d14486e82"
    ) as DecodedProps;

    const authUser = new UserRepository();

    const user = await authUser.findById(user_id);

    if (!user) {
      throw new AppErrors("User does not exists!", 401);
    }

    req.user = user;

    next();
  } catch {
    throw new AppErrors("Invalid token!", 401);
  }
}
