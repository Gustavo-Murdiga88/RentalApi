import { Users } from "@Users/infra/typeorm/entities/Users";
import { hash } from "bcrypt";

import { AppDataSource } from "../config";

async function createAdmin() {
  const password = await hash("admin", 8);

  const user = new Users();
  user.admin = true;
  user.avatar = "";
  user.name = "admin";
  user.password = password;
  user.email = "admin@admin.com";
  user.driver_license = "XXXX";

  AppDataSource.getRepository(Users).save(user);
}

createAdmin().then(() => {
  console.log("created admin with success");
});
