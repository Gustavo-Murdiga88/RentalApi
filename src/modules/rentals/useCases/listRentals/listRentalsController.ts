import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsUseCase } from "./listRentalsUseCase";

export class ListRentalsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.user?.id;

    const listRentalsUseCase = container.resolve(ListRentalsUseCase);

    const all = await listRentalsUseCase.execute(id || "");

    return res.status(200).send(all);
  }
}
