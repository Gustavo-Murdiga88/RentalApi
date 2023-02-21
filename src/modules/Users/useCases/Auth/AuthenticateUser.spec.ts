import "reflect-metadata";

import { UsersInMemoryRepository } from "@Users/repositories/in-memory/CreateUserInMemory";
import { AuthenticationUseCase } from "@Users/useCases/Auth/AuthenticationUSerUserCase";

let usersInMemoryRepository: UsersInMemoryRepository;
let authenticationUseCase: AuthenticationUseCase;

describe("should be authenticate user", () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    authenticationUseCase = new AuthenticationUseCase(usersInMemoryRepository);
  });

  it("should be authenticate user after created", async () => {
    const user = {
      avatar: "",
      driver_license: "123",
      email: "gumurdiga@gumurdiga.com",
      name: "Gustavo Murdiga",
      password: "123456",
    };

    const userCreated = await usersInMemoryRepository.create(user);

    const token = await authenticationUseCase.execute(userCreated);

    expect(token).toHaveProperty("token");
    expect(token).toHaveProperty("user");
  });
});
