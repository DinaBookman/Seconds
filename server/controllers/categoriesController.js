import { CategoriesService } from '../service/categoriesService.js'
export class CategoriesController {
    async getCategories(req, res, next) {
        try {

            const categoriesService = new CategoriesService();
            const resultItems = await categoriesService.getCategories();
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getCategory(req, res, next) {
        try {

            const categoriesService = new CategoriesService();
            const resultItem = await categoriesService.getCategory(req.params.id);
            return res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}