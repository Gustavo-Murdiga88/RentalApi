import { Router } from "express";
import multer from "multer";

import { upload } from "../config/upload";
// import createCategoryController from "../modules/cars/useCases/createCategory";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/createCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/importCategoriesController";
import { ListsCategoriesController } from "../modules/cars/useCases/listCategory/ListCategoriesController";

const categoriesRoutes = Router();

const middlewareUpload = multer(upload());

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);

const listCategoriesController = new ListsCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle);

const importCategoriesController = new ImportCategoriesController();
categoriesRoutes.post(
  "/import",
  middlewareUpload.single("file"),
  importCategoriesController.handler
);

export { categoriesRoutes };
