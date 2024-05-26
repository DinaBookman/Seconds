import express from 'express';
import multer from 'multer';
import path from 'path';
import { ProductsService } from "../service/productsService.js";

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }).single('image');
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

    async addProduct(req, res, next) {
        const productsService = new ProductsService();
        upload(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).send('Error uploading file');
            }
            if (!req.file) {
                console.log("No file uploaded");
                return res.status(400).send('No file uploaded');
            }

            const imgSrc = 'http://localhost:8080/uploads/' + req.file.filename;
            // const productItem = {
            //     'ownerId': parseInt(req.body.ownerId),
            //     'title': req.body.title,
            //     'description': req.body.description,
            //     'category': parseInt(req.body.category),
            //     'state': parseInt(req.body.state),
            //     'area': req.body.area,
            //     'price': parseInt(req.body.price)
            // }

            const productItem = req.body;

            try {
                const result = await productsService.addProduct(productItem, imgSrc);
                res.json({ message: 'Product added successfully', result });
            } catch (error) {
                console.error('Error adding product:', error);
                res.status(500).json({ error: 'Error adding product' });
            }
        });


        // try {
        //     console.log("cotroller reqest: ",req.body)
        //     const productService = new ProductsService();
        //     await productService.addProduct(req.body,req.file);
        //     res.status(200).json({ status: 200 });
        // }
        // catch (ex) {
        //     const err = {}
        //     err.statusCode = 500;
        //     err.message = ex;
        //     next(err)
        // }
    }
    // async getByParamsQuery(req, res, next) {
    //     try {
    //         const productsService = new ProductsService();
    //         const resultItem = await productsService.getProductsById("products", req.params.id);
    //         res.status(200).json(resultItem);
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }





    // async deleteUser(req, res, next) {
    //     try {
    //         const usersService = new DataService();
    //         await usersService.delete(TABLE, req.params.id);
    //         res.status(200).json({ status: 200 });
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }

    // async updateUser(req, res, next) {
    //     try {
    //         const usersService = new DataService();
    //         await usersService.update(TABLE, req.body, req.params.id);
    //         res.status(200).json({ status: 200 })
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }


}