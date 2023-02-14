import { Router } from "express";
import multer from "multer";

// import createCategoryController from "../modules/cars/useCases/createCategory";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/createCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/importCategoriesController";
import { ListsCategoriesController } from "../modules/cars/useCases/listCategory/ListCategoriesController";

const categoriesRoutes = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./tmp");
  },
  filename: (req, file, cb) => {
    cb(null, "categories.csv");
  },
});
const upload = multer({
  storage,
  preservePath: true,
});

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);

const listCategoriesController = new ListsCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle);

const importCategoriesController = new ImportCategoriesController();
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handler
);

export { categoriesRoutes };
