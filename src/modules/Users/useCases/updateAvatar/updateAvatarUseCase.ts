import { S3 } from "@aws-sdk/client-s3";
import { IUsersRepository } from "@Users/repositories/interfaces/Users";
import { readFile } from "fs/promises";
import mime from "mime";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { fileURLToPath } from "url";
import { DeleteFile } from "utils/deleteFile";

type IRequest = {
  id: string;
  file_name: string;
};

@injectable()
export class UpdateAvatarUseCase {
  user: IUsersRepository;

  constructor(
    @inject("UserRepository")
    userRepository: IUsersRepository
  ) {
    this.user = userRepository;
  }

  async execute({ file_name, id }: IRequest): Promise<void> {
    const userRepository = await this.user.findById(id);

    const client = new S3({
      region: process.env.AWS_REGION,
    });

    const path = resolve(__dirname, "..", "..", "..", "..", "..", "tmp");
    console.log(path);

    if (userRepository?.avatar !== "" && userRepository?.avatar) {
      await DeleteFile(`avatar/${userRepository.avatar}`);

      await client.deleteObject({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: `avatar/${userRepository.avatar}`,
      });
    }

    if (userRepository) {
      userRepository.avatar = file_name;

      await this.user.update(userRepository);

      const file = await readFile(`${path}/avatar/${file_name}`);

      const ContentType = mime.getType(file_name) || "";

      await client.putObject({
        Bucket: `${process.env.AWS_BUCKET}`,
        Body: file,
        Key: `avatar/${file_name}`,
        ACL: "public-read",
        ContentType,
      });
    }
  }
}
