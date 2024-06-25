import express from 'express';
import multer from 'multer';
import path from 'path';
import { ProductsService } from "../service/productsService.js";

// const storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './uploads');
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage }).single('image');

export class ProductsController {

    async getProducts(req, res, next) {
        try {

            const productsService = new ProductsService();
            const resultItems = await productsService.getProducts(req.query);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getProduct(req, res, next) {
        try {
            const todosService = new ProductsService();
            const resultItem = await todosService.getProduct(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }




    async addProduct(req, res, next) {
        const productsService = new ProductsService();
        const imgSrc = 'http://localhost:8080/uploads/' + req.file.filename;

        const productItem = req.body;

        try {
            const result = await productsService.addProduct(productItem, imgSrc);
            res.json({ message: 'Product added successfully', result });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ error: 'Error adding product' });
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const productsService = new ProductsService();
            await productsService.deleteProduct(req.params.id);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async updateProduct(req, res, next) {
        console.log(req)
        const productsService = new ProductsService();
        const imgSrc = req.file ? 'http://localhost:8080/uploads/' + req.file.filename : null;

        const productItem = req.body;
console.log(req.body)
        try {
            const result = await productsService.updateProduct(productItem, imgSrc, req.params.id);
            res.json({ message: 'Product added successfully', result });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ error: 'Error adding product' });
        }
    }

}