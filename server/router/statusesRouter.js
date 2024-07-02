import express from 'express';
import { StatusesController } from '../controllers/statusesController.js';

const statusesRouter = express.Router();

const statusesController = new StatusesController()

statusesRouter.get("/", statusesController.getStatuses)
statusesRouter.get("/:id", statusesController.getStatus)
export {
    statusesRouter
}