import express from 'express';

import path from 'path';
import multer from 'multer';

//import { ProductsService } from '../service/productsService.js';
import { ProductsController } from "../controllers/productsController.js";
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }).single('image');

const productsRouter = express.Router();

const productsController = new ProductsController()

productsRouter.get("/", productsController.getProducts)

productsRouter.get("/:id", productsController.getProduct)

productsRouter.post('/', upload, productsController.addProduct);

productsRouter.delete("/:id", productsController.deleteProduct)

productsRouter.patch("/:id",upload, productsController.updateProduct)

export {
    productsRouter
}