import { Users } from "@Users/infra/typeorm/entities/Users";
import { DataSource } from "typeorm";

import { Category } from "../../modules/cars/infra/entities/Category";
import { Specifications } from "../../modules/cars/infra/entities/Specification";

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
  migrations: ["./src/shared/migration/*.ts"],
  subscribers: [],
  migrationsTableName: "migrations",
});

AppDataSource.initialize()
  .then(() => {
    console.log("conexão com o banco de dados realizada com sucesso.");
  })
  .catch((error) => console.log(error));
