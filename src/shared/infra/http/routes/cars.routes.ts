import { CreateCarController } from "@cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@cars/useCases/createCarSpecifications/createCarSpecificationController";
import { ListCarsController } from "@cars/useCases/listCars/ListCarsController";
import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

const carsRoutes = Router();

carsRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/list", listCarsController.handle);

carsRoutes.put(
  "/specifications",
  ensureAuthentication,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carsRoutes };
