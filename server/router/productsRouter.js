import express from "express";
import { ProductsController } from "../controllers/productsController.js";
const productsRouter = express.Router();

const productsController = new ProductsController()

productsRouter.get("/", productsController.getProducts)

// usersRouter.get("/:id", userscontroller.getUserById)

// usersRouter.post("/", userscontroller.addUser)
// usersRouter.delete("/:id", userscontroller.deleteUser)
// usersRouter.put("/:id", userscontroller.updateUser)

export {
    productsRouter
}