import { inject, injectable } from "tsyringe";

import { DeleteFile } from "../../../../utils/deleteFile";
import { IUsersRepository } from "../../repositories/interfaces/Users";

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

    if (userRepository?.avatar !== "" && userRepository?.avatar) {
      await DeleteFile(`avatar/${userRepository.avatar}`);
    }

    if (userRepository) {
      userRepository.avatar = file_name;
      await this.user.update(userRepository);
    }
  }
}
