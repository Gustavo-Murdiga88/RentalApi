import { DataSource } from "typeorm";

import { Car } from "../../modules/cars/infra/typeorm/entities/Car";
import { Category } from "../../modules/cars/infra/typeorm/entities/Category";
import { CarImages } from "../../modules/cars/infra/typeorm/entities/images";
import { Specifications } from "../../modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "../../modules/rentals/infra/typeorm/entities/rental";
import { Users } from "../../modules/Users/infra/typeorm/entities/Users";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TS_NODE_DEV ? "database_ignite" : "localhost",
  port: 5432,
  username: "docker",
  password: "docker",
  database: "ignite",
  synchronize: true,
  logging: false,
  entities: [Category, Specifications, Users, Car, CarImages, Rental],
  migrations: ["./src/shared/typeorm/migration/*.ts"],
  subscribers: [],
  migrationsTableName: "migrations",
});

AppDataSource.initialize()
  .then(() => {
    console.log("conexão com o banco de dados realizada com sucesso.");
  })
  .catch((error) => {
    console.log(error);
  });
