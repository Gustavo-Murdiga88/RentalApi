import { Router } from "express";

import { CreateUserController } from "../modules/Users/useCases/createUser/createUserController";

const createUsersController = new CreateUserController();

const usersRoutes = Router();

usersRoutes.post("/", createUsersController.handle);

export { usersRoutes };
