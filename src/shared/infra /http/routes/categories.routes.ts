import { CreateCategoryController } from "@cars/useCases/createCategory/createCategoryController";
import { ImportCategoriesController } from "@cars/useCases/importCategories/importCategoriesController";
import { ListsCategoriesController } from "@cars/useCases/listCategory/ListCategoriesController";
import { upload } from "config/upload";
import { Router } from "express";
import multer from "multer";

// import createCategoryController from "../modules/cars/useCases/createCategory";

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
