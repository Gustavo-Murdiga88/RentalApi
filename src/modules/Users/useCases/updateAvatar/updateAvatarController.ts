import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateAvatarUseCase } from "./updateAvatarUseCase";

export class UpdateAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { id } = req.user!;
    const { file } = req;

    const file_name = file?.filename;

    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    await updateAvatarUseCase.execute({
      id,
      file_name: file_name ?? "",
    });

    return res.status(204).send();
  }
}
