import { Response, Request } from "express";
import { IRequestRentals } from "modules/rentals/repositories/interfaces/IRentalsRepository";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, expected_return_date } = req.body as IRequestRentals;

    const user_id = req.user?.id || "";

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id,
    });

    return res.status(200).json({
      msg: "Rental has register with successfully",
      rental,
    });
  }
}
