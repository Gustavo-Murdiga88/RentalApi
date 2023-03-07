import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionUseCase } from "./devolutionUseCase";

export class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const devolutionUseCase = container.resolve(DevolutionUseCase);

    const devolution = await devolutionUseCase.execute({ idRental: id });

    return res.status(200).json({
      devolution,
    });
  }
}
