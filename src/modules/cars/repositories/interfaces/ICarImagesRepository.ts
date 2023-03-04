export type SaveImagesDTO = {
  car_id: string;
  file: string;
};

export type ReturnCreate = {
  car_id: string;
  image_name: string;
};

export interface ICarImagesRepository {
  create({ car_id, file }: SaveImagesDTO): Promise<ReturnCreate>;
}
