import { Request, Response } from "express";
import { container } from "tsyringe";

import {
  IRequestCreateSpecification,
  CreateCarSpecificationUseCase,
} from "./createCarSpecificationsUseCase";

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, specifications_id } =
      req.body as IRequestCreateSpecification;

    const createCarSpecificationsUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecificationsUseCase.execute({
      car_id,
      specifications_id,
    });

    return res.status(200).json({
      car,
    });
  }
}
