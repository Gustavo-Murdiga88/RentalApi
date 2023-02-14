import { DataSource } from "typeorm";

import { Category } from "./modules/cars/entities/Category";
import { Specifications } from "./modules/cars/entities/Specification";
import { Users } from "./modules/Users/entities/Users";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_ignite",
  port: 5432,
  username: "docker",
  password: "docker",
  database: "ignite",
  synchronize: true,
  logging: false,
  entities: [Category, Specifications, Users],
  migrations: ["./src/migration/*.ts"],
  subscribers: [],
  migrationsTableName: "migrations",
});

AppDataSource.initialize()
  .then(() => {
    console.log("conexão com o banco de dados realizada com sucesso.");
  })
  .catch((error) => console.log(error));
