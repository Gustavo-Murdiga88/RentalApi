import { IRequestListCars } from "@cars/repositories/interfaces/ICreateCarRepository";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsUseCase } from "./listCarsUseCase";

export class ListCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, category_id, name } = req.query as IRequestListCars;

    const listCarsUseCase = container.resolve(ListCarsUseCase);

    const list = await listCarsUseCase.execute({ brand, category_id, name });

    return res.status(200).json(list);
  }
}
