import { CreateUserController } from "@Users/useCases/createUser/createUserController";
import { UpdateAvatarController } from "@Users/useCases/updateAvatar/updateAvatarController";
import { upload } from "config/upload";
import { Router } from "express";
import multer from "multer";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

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
