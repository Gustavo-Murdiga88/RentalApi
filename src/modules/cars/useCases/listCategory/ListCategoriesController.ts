import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListsCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListsCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListsCategoriesUseCase);

    return res.json(await listCategoriesUseCase.execute());
  }
}
