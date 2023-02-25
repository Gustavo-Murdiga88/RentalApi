import { CreateCategoryController } from "@cars/useCases/createCategory/createCategoryController";
import { ImportCategoriesController } from "@cars/useCases/importCategories/importCategoriesController";
import { ListsCategoriesController } from "@cars/useCases/listCategory/ListCategoriesController";
import { upload } from "config/upload";
import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

// import createCategoryController from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();

const middlewareUpload = multer(upload());

const listCategoriesController = new ListsCategoriesController();
const importCategoriesController = new ImportCategoriesController();
const createCategoryController = new CreateCategoryController();

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.use(ensureAuthentication, ensureAdmin);

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.post(
  "/import",
  middlewareUpload.single("file"),
  importCategoriesController.handler
);

export { categoriesRoutes };
