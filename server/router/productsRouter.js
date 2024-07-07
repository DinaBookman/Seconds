import express from 'express';

import path from 'path';
import multer from 'multer';

import { ProductsController } from "../controllers/productsController.js";
import { verifyToken } from '../middleware/verifyToken.js';
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

productsRouter.post('/',verifyToken, upload, productsController.addProduct);

productsRouter.delete("/:id",verifyToken, productsController.deleteProduct)

productsRouter.patch("/:id",verifyToken,upload, productsController.updateProduct)

export {
    productsRouter
}