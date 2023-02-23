import { CreateSpecificationsController } from "@cars/useCases/createSpecification/createSpecificationController";
import { Router } from "express";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const createSpecificationController = new CreateSpecificationsController();
const specificationRoutes = Router();

specificationRoutes.use(ensureAuthentication);

specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
