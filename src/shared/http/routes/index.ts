import { Router } from "express";
import productsRouter from "@modules/products/routes/products.routes";
import userRoutes from "@modules/users/routes/userRoutes";
const routes = Router();

routes.use("/products", productsRouter)
routes.use("/users", userRoutes)

routes.get("/", (req, res) => {
  return res.json({
    message: "api rodando"
  })
})
export default routes;
