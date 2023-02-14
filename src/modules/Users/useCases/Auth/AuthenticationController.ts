import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticationUseCase } from "./AuthenticationUSerUserCase";

export class AuthenticationController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const authenticationUseCase = container.resolve(AuthenticationUseCase);
    try {
      const response = await authenticationUseCase.execute({ email, password });
      res.status(200).send(response);
    } catch (error) {
      res.status(401).send(error);
    }
  }
}
