// eslint-disable-next-line import/no-self-import
import "express";

import { Users } from "modules/Users/infra/typeorm/entities/Users";

type User = Users;

// declare namespace Express {
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   export interface Request {
//     user: {
//       id: string;
//     };
//   }
// }

declare module "express" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request extends IUsers {
    user?: User;
  }
}
