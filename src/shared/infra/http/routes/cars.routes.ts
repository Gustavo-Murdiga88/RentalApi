import { CreateCarController } from "@cars/useCases/createCar/CreateCarController";
import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

const createCarController = new CreateCarController();

const carsRoutes = Router();

carsRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle
);

export { carsRoutes };
