import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationsUseCase } from "./createSpecificationsUseCase";

export class CreateSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationsUseCase
    );
    try {
      await createSpecificationUseCase.execute({ description, name });
      return res.status(201).send({
        message: "specification created",
      });
    } catch {
      return res.status(400).send({
        message: "specification already exists",
      });
    }
  }
}
