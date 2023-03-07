import { Rental } from "modules/rentals/infra/typeorm/entities/rental";

export type IRequestRentals = {
  user_id: string;
  car_id: string;
  expected_return_date: string;
};

export type IRequestDevolution = {
  total: number;
  id: string;
};

export interface IRentalsRepository {
  create({
    car_id,
    expected_return_date,
    user_id,
  }: IRequestRentals): Promise<Rental>;

  findRentalByUser_id(user_id: string): Promise<Rental>;
  findRentalByCar_id(car_id: string): Promise<Rental>;
  findById(idRental: string): Promise<Rental>;
  updateRental({ id, total }: IRequestDevolution): Promise<Rental>;
  findRentalsByUserId(id: string): Promise<Rental[]>;
}
