import { CarDTO } from "@cars/dto";
import { CreateCarRepositoryInMemory } from "@cars/repositories/in-memory/InMemoryCreateCarRepository";

import { AppErrors } from "@shared/errors/appErros";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarRepositoryInMemory: CreateCarRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("should be able create Car follow all roles find in requirements", () => {
  beforeEach(() => {
    createCarRepositoryInMemory = new CreateCarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(createCarRepositoryInMemory);
  });

  it("should be create a new car", async () => {
    const car = {
      name: "Audi A4",
      brand: "Audi",
      category_id: "category_id",
      daily_rate: 140,
      description: "Carro esportivo",
      fine_amount: 100,
      license_plate: "ABC-1024",
    } as CarDTO;

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated).toHaveProperty("id");
  });

  it("should be not able register car with license plate already existing", async () => {
    expect(async () => {
      const car = {
        name: "Audi A4",
        brand: "Audi",
        category_id: "category_id",
        daily_rate: 140,
        description: "Carro esportivo",
        fine_amount: 100,
        license_plate: "ABC-1024",
      } as CarDTO;

      await createCarUseCase.execute(car);
      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppErrors);
  });

  it("should be able register with property available as true ", async () => {
    const car = {
      name: "Audi A4",
      brand: "Audi",
      category_id: "category_id",
      daily_rate: 140,
      description: "Carro esportivo",
      fine_amount: 100,
      license_plate: "ABC-1024",
    } as CarDTO;

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated.available).toBe(true);
  });
});
