import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";

interface IRequest {
  name: string
  email: string
  password: string

}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    const userAlreadyExists = await userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError("user already exists!")
    }
    const hashPassword = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      password: hashPassword
    })

    await userRepository.save(user)

    return user
  }
}

export default CreateUserService
