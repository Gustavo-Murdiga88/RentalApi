import {
  ICarImagesRepository,
  ReturnCreate,
  SaveImagesDTO,
} from "@cars/repositories/interfaces/ICarImagesRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/typeorm/data-source";

import { CarImages } from "../entities/images";

export class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImages>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImages);
  }

  async create({ car_id, file }: SaveImagesDTO): Promise<ReturnCreate> {
    const images = await this.repository.save({
      car_id,
      image_name: file,
    });

    return images;
  }
}
