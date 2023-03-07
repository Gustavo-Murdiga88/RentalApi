import { Router } from "express";
import { CreateRentalController } from "modules/rentals/useCases/createRentals/CreateRentalsController";
import { DevolutionRentalController } from "modules/rentals/useCases/devolutions/devolutionController";
import { ListRentalsController } from "modules/rentals/useCases/listRentals/listRentalsController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsController = new ListRentalsController();

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthentication,
  devolutionRentalController.handle
);

rentalRoutes.get("/list", ensureAuthentication, listRentalsController.handle);

export { rentalRoutes };
