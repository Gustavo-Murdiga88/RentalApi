import { Router } from "express";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateSpecificationsController } from "../modules/cars/useCases/createSpecification/createSpecificationController";

const createSpecificationController = new CreateSpecificationsController();
const specificationRoutes = Router();

specificationRoutes.use(ensureAuthentication);

specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
