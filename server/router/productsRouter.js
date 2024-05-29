import express from 'express';
import multer from 'multer';
import path from 'path';
//import { ProductsService } from '../service/productsService.js';
import { ProductsController } from "../controllers/productsController.js";
const productsRouter = express.Router();

const productsController = new ProductsController()

productsRouter.get("/", productsController.getProducts)

productsRouter.post('/', productsController.addProduct);

productsRouter.delete("/:id", productsController.deleteProduct)

productsRouter.patch("/:id", productsController.updateProduct)

export {
    productsRouter
}