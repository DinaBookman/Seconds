
import { UserLoginService } from "../service/userLoginService.js";

export class UserLoginController {
    //post
    async checkUserLogin(req, res, next) {
        try {
            const userLoginService = new UserLoginService();
            const resultItem = await userLoginService.checkUserLogin(req.body);
            console.log(resultItem)
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    // get
    async getUserLogin(req, res, next) {
        try {
            const userLoginService = new UserLoginService();
            const resultItem = await userLoginService.getUserLogin(req.query);
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
