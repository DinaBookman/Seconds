import express from 'express';
import multer from 'multer';
import path from 'path';
//import { ProductsService } from '../service/productsService.js';
import { ProductsController } from "../controllers/productsController.js";
const productsRouter = express.Router();

const productsController = new ProductsController()

productsRouter.get("/", productsController.getProducts)

//productsRouter.post("/", productsController.addProduct)

//const productService = new ProductsService();

//const storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './uploads');
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

//const upload = multer({ storage: storage }).single('image');

productsRouter.post('/', productsController.addProduct);



// usersRouter.get("/:id", userscontroller.getUserById)

//usersRouter.post("/", userscontroller.addUser)
// usersRouter.delete("/:id", userscontroller.deleteUser)
// usersRouter.put("/:id", userscontroller.updateUser)

export {
    productsRouter
}