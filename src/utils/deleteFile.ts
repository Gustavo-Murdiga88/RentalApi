import { stat, unlink } from "fs/promises";

export async function DeleteFile(file: string) {
  const path = `./tmp/${file}`;

  try {
    await stat(path);
  } catch {
    return;
  }

  await unlink(path);
}
