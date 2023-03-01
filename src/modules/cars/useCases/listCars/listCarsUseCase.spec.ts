import { CreateCarRepositoryInMemory } from "@cars/repositories/in-memory/InMemoryCreateCarRepository";
import { ICreateCarRepository } from "@cars/repositories/interfaces/ICreateCarRepository";

import { ListCarsUseCase } from "./listCarsUseCase";

let createCarRepositoryInMemory: ICreateCarRepository;
let listCarsUseCaseInMemory: ListCarsUseCase;
describe("should be able list cars with params or not", () => {
  beforeEach(() => {
    createCarRepositoryInMemory = new CreateCarRepositoryInMemory();
    listCarsUseCaseInMemory = new ListCarsUseCase(createCarRepositoryInMemory);
  });

  it("should be be able list cars that params available is true", async () => {
    const car = await createCarRepositoryInMemory.create({
      brand: "Test",
      category_id: "392fe122-7c76-4de8-a12a-405ba006755e",
      daily_rate: 100,
      description: "test",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "test",
    });

    const list = await listCarsUseCaseInMemory.execute({});

    expect(list).toContain(car);
  });

  it("should be be able list cars that params name included", async () => {
    await createCarRepositoryInMemory.create({
      brand: "Test",
      category_id: "392fe122-7c76-4de8-a12a-405ba006755e",
      daily_rate: 100,
      description: "test",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "test",
    });

    await createCarRepositoryInMemory.create({
      brand: "Test1",
      category_id: "392fe122-7c76-4de8-a12a-405ba006755e",
      daily_rate: 100,
      description: "test1",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "test2",
    });

    const list = await listCarsUseCaseInMemory.execute({
      name: "test",
    });

    expect(list).toHaveLength(1);
  });

  it("should be able list cars that params category is included", async () => {
    await createCarRepositoryInMemory.create({
      brand: "Test",
      category_id: "392fe122-7c76-4de8-a12a-405ba006755e",
      daily_rate: 100,
      description: "test",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "test",
    });

    await createCarRepositoryInMemory.create({
      brand: "Test1",
      category_id: "d3c5d364-8765-4e4b-9114-5ab3f554f5c0",
      daily_rate: 100,
      description: "test1",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "test2",
    });

    const list = await listCarsUseCaseInMemory.execute({
      category_id: "d3c5d364-8765-4e4b-9114-5ab3f554f5c0",
    });

    expect(list).toHaveLength(1);
  });

  it("should be able list cars that params band is included", async () => {
    await createCarRepositoryInMemory.create({
      brand: "Test1",
      category_id: "392fe122-7c76-4de8-a12a-405ba006755e",
      daily_rate: 100,
      description: "test",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "test",
    });

    await createCarRepositoryInMemory.create({
      brand: "Test0",
      category_id: "d3c5d364-8765-4e4b-9114-5ab3f554f5c0",
      daily_rate: 100,
      description: "test1",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "test2",
    });

    const list = await listCarsUseCaseInMemory.execute({
      brand: "Test0",
    });

    expect(list).toHaveLength(1);
  });

  it("should be able a list empty of cars when params no match with cars", async () => {
    await createCarRepositoryInMemory.create({
      brand: "Test",
      category_id: "392fe122-7c76-4de8-a12a-405ba006755e",
      daily_rate: 100,
      description: "test",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "test",
    });

    await createCarRepositoryInMemory.create({
      brand: "Test1",
      category_id: "d3c5d364-8765-4e4b-9114-5ab3f554f5c0",
      daily_rate: 100,
      description: "test1",
      fine_amount: 100,
      license_plate: "XXXX",
      name: "test2",
    });

    const list = await listCarsUseCaseInMemory.execute({
      category_id: "d3c5d364-8765-4e4b-9114-5ab3f554f5c9",
      brand: "Teste0",
      name: "Teste0",
    });

    expect(list).toHaveLength(0);
  });
});
