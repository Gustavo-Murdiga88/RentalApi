import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoriesUseCase } from "./importCategoriesUseCase";

export class ImportCategoriesController {
  async handler(req: Request, res: Response) {
    const { file } = req;

    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase);
    try {
      if (file) await importCategoriesUseCase.execute(file);

      return res.status(200).send({
        message: "import successfully.",
      });
    } catch {
      return res.status(400).send({
        message: "All products already exists",
      });
    }
  }
}
