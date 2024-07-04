
import { ProductsService } from "../service/productsService.js";


export class ProductsController {

    async getProducts(req, res, next) {
        try {

            const productsService = new ProductsService();
            let resultItems = await productsService.getProducts(req.query);
            resultItems = resultItems.map((product) => ({...product,img:`${process.env.API_URL}/uploads/` + product.img}))
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
            let resultItem = await todosService.getProduct(req.params.id);
            resultItem = [{ ...resultItem[0], img: `${process.env.API_URL}/uploads/` + resultItem[0].img }]
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
        const imgSrc = req.file.filename;
        const productItem = req.body;
        console.log(imgSrc,productItem,"fgxfchvjkb")
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
        const productsService = new ProductsService();
        const imgSrc = req.file ?  req.file.filename : null;

        const productItem = req.body;

        try {
            const result = await productsService.updateProduct(productItem, imgSrc, req.params.id);
            res.json({ message: 'Product added successfully', result });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ error: 'Error adding product' });
        }
    }

}