import express from 'express';
import {CategoriesController} from '../controllers/categoriesController.js'

const categoriesRouter = express.Router();

const categoriesController = new CategoriesController()

categoriesRouter.get("/", categoriesController.getCategories)
categoriesRouter.get("/:id", categoriesController.getCategory)
export {
    categoriesRouter
}