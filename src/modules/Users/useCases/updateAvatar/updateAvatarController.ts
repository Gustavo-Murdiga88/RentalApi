import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateAvatarUseCase } from "./updateAvatarUseCase";

export class UpdateAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
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
