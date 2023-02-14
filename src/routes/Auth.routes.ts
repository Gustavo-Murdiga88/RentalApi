import { Router } from "express";

import { AuthenticationController } from "../modules/Users/useCases/Auth/AuthenticationController";

const AuthRoutes = Router();

const authenticationController = new AuthenticationController();

AuthRoutes.post("/", authenticationController.handle);

export { AuthRoutes };
