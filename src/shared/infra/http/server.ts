import "reflect-metadata";
import "express-async-errors";
import express from "express";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";

import "@shared/typeorm/config";
import "@shared/container";

import openAPI from "../../../../openapi.json";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use("/app-docs", swaggerUI.serve, swaggerUI.setup(openAPI));

// routes
app.use(routes);

app.listen(3333, () => {
  console.log("Server is running on docker");
});
