import { NextFunction, Router, Request, Response } from "express";

import { AppErrors } from "../errors/appErros";
import { AuthRoutes } from "./Auth.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationRoutes);
routes.use("/users", usersRoutes);
routes.use("/auth", AuthRoutes);

routes.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppErrors) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).send({
    status: "error",
    message: `internal server error - ${err.message}`,
  });
});

export { routes };
