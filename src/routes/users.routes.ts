import { Router } from "express";
import multer from "multer";

import { upload } from "../config/upload";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateUserController } from "../modules/Users/useCases/createUser/createUserController";
import { UpdateAvatarController } from "../modules/Users/useCases/updateAvatar/updateAvatarController";

const createUsersController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();

const usersRoutes = Router();

const middlewareUploadAvatar = multer(upload("avatar"));

usersRoutes.use(ensureAuthentication);

usersRoutes.post("/", createUsersController.handle);

usersRoutes.patch(
  "/avatar",
  middlewareUploadAvatar.single("avatar"),
  updateAvatarController.handle
);

export { usersRoutes };
