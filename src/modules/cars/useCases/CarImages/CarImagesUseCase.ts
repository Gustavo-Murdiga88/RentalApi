import { ICarImagesRepository } from "@cars/repositories/interfaces/ICarImagesRepository";
import { inject, injectable } from "tsyringe";

type IRequest = {
  car_id: string;
  files: string[];
};

@injectable()
export class CarImagesUseCase {
  private car_images: ICarImagesRepository;

  constructor(
    @inject("CarImagesRepository")
    car_images: ICarImagesRepository
  ) {
    this.car_images = car_images;
  }

  async execute({ car_id, files }: IRequest): Promise<void> {
    files.forEach(async (file) => {
      await this.car_images.create({ car_id, file });
    });
  }
}
