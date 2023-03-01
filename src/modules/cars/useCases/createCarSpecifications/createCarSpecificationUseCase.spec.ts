import { CreateCarRepositoryInMemory } from "@cars/repositories/in-memory/InMemoryCreateCarRepository";
import { CreateSpecificationsInMemory } from "@cars/repositories/in-memory/InMemoryCreateSpecifications";
import { ISpecificationsRepository } from "@cars/repositories/interfaces/ISpacificationsRepository";

import { AppErrors } from "@shared/errors/appErros";

import { CreateCarSpecificationUseCase } from "./createCarSpecificationsUseCase";

let createSpecificationsRepository: ISpecificationsRepository;
let createCarRepository: CreateCarRepositoryInMemory;
let createCarSpecificationsUseCase: CreateCarSpecificationUseCase;

describe("should be able create specification in cars", () => {
  beforeEach(() => {
    createSpecificationsRepository = new CreateSpecificationsInMemory();
    createCarRepository = new CreateCarRepositoryInMemory();
    createCarSpecificationsUseCase = new CreateCarSpecificationUseCase(
      createSpecificationsRepository,
      createCarRepository
    );
  });

  it("should be create specification at car", async () => {
    const specification = await createSpecificationsRepository.create({
      description: "test",
      name: "test",
    });

    const car = await createCarRepository.create({
      brand: "teste",
      daily_rate: 100,
      description: "teste",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "teste",
      category_id: "34ce7f0a-98c0-41cd-ae10-becc6f7208fc",
    });

    const cars = await createCarSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(cars).toHaveProperty("specifications");
    expect(car.specifications).toHaveLength(1);
  });

  it("not be able create a specification in car that not exists", async () => {
    expect(async () => {
      const carId = "1234";
      const specification = ["4566"];
      await createCarSpecificationsUseCase.execute({
        car_id: carId,
        specifications_id: specification,
      });
    }).rejects.toBeInstanceOf(AppErrors);
  });

  it("should be able register just specifications not duplicated", async () => {
    const car = await createCarRepository.create({
      brand: "teste",
      daily_rate: 100,
      description: "teste",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "teste",
      category_id: "34ce7f0a-98c0-41cd-ae10-becc6f7208fc",
    });

    const specification = await createSpecificationsRepository.create({
      description: "test",
      name: "test",
    });

    const response = await createCarSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id, specification.id],
    });

    expect(response.specifications).toHaveLength(1);
  });
});
