import { parse as CSVparse } from "csv-parse";
import { createReadStream, unlink } from "fs";
import { inject, injectable } from "tsyringe";

import { CategoriesRepository } from "../../repositories/implementations/category";

const parser = CSVparse({});

interface IICategoriesFile {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoriesUseCase {
  private categories: IICategoriesFile[] = [];

  private categoriesRepository: CategoriesRepository;

  constructor(
    @inject("CategoriesRepository")
    categoriesRepository: CategoriesRepository
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  private async loadCategories() {
    this.categories.forEach(async ({ description, name }) => {
      const category = await this.categoriesRepository.findByName(name);
      console.log(category);

      if (!category) {
        await this.categoriesRepository.create({
          description,
          name,
        });
      }
    });
  }

  async execute(file: Express.Multer.File) {
    const fileReader = createReadStream(file.path);

    fileReader.pipe(parser);
    parser
      .on("data", async (line) => {
        const [name, description] = line;
        this.categories.push({
          description,
          name,
        });
      })
      .on("end", async () => {
        await this.loadCategories();
        unlink(file.path, (e) => {
          console.log(e);
        });
      });
  }
}
