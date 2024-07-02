import { StatusesService } from "../service/statusesService.js";
export class StatusesController {
    async getStatuses(req, res, next) {
        try {

            const statusesService = new StatusesService();
            const resultItems = await statusesService.getStatuses();
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getStatus(req, res, next) {
        try {

            const statusesService = new StatusesService();
            const resultItem = await statusesService.getStatus(req.params.id);
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