import { AuthenticationController } from "@Users/useCases/Auth/AuthenticationController";
import { Router } from "express";

const AuthRoutes = Router();

const authenticationController = new AuthenticationController();

AuthRoutes.post("/", authenticationController.handle);

export { AuthRoutes };
