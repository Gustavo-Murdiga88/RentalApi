import multer from "multer";
import { randomBytes } from "node:crypto";

export function upload(folder?: string) {
  return {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const path = folder ? `./tmp/${folder}` : "./tmp";

        cb(null, path);
      },
      filename: (req, file, cb) => {
        const file_hash = randomBytes(16).toString("hex");
        const file_name = `${file_hash}-${file.originalname}`;

        return cb(null, file_name);
      },
    }),
    preservePath: true,
  };
}
