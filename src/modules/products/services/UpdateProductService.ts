import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}


class UpadateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)
    if (!product) {
      throw new AppError(" there is not this product on the system")
    }
    const produtAlreadyExits = await productRepository.findByName(name)

    if (produtAlreadyExits && name !== product.name) {
      throw new AppError("there is a product with this name")
    }
    product.name = name
    product.price = price
    product.quantity = quantity

    await productRepository.save(product)

    return product
  }
}
export default UpadateProductService
