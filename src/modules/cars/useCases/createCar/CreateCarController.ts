import { CarDTO } from "@cars/dto";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
  async handle(req: Request, res: Response) {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    }: CarDTO = req.body;

    const createCarUSeCase = container.resolve(CreateCarUseCase);

    const response = await createCarUSeCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    res.status(201).json(response);
  }
}
