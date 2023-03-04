import { CarImagesController } from "@cars/useCases/CarImages/CarImagesController";
import { CreateCarController } from "@cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@cars/useCases/createCarSpecifications/createCarSpecificationController";
import { ListCarsController } from "@cars/useCases/listCars/ListCarsController";
import { upload } from "config/upload";
import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const carImagesController = new CarImagesController();

const images = multer(upload("cars"));

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

carsRoutes.post(
  "/images/:id",
  ensureAuthentication,
  ensureAdmin,
  images.array("images"),
  carImagesController.handle
);

export { carsRoutes };
