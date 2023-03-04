import { Request, Response } from "express";
import { container } from "tsyringe";

import { CarImagesUseCase } from "./CarImagesUseCase";

type IFiles = {
  filename: string;
};

export class CarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const images = req.files as IFiles[];

    const files = images.map((item) => item.filename);

    const carImagesUseCase = container.resolve(CarImagesUseCase);

    await carImagesUseCase.execute({
      car_id: id,
      files,
    });

    return res.status(200).json({
      message: "upload images successfully",
    });
  }
}
