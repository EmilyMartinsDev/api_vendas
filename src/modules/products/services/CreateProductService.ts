import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

interface IRequest {
  name: string
  price: number
  quantity: number
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    const produtAlreadyExits = await productRepository.findByName(name)

    if (produtAlreadyExits) {
      throw new AppError("there is a product with this name")
    }

    const product = productRepository.create({
      name,
      price,
      quantity
    })
    await productRepository.save(product);

    return product
  }
}
export default CreateProductService
