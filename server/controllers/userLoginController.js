
import { UserLoginService } from "../service/userLoginService.js";
import { verifyRecaptcha } from "../service/recaptchaService.js";

export class UserLoginController {
    //post
    async checkUserLogin(req, res, next) {
        try {
            const { token, ...userData } = req.body;
            const isRecaptchaValid = await verifyRecaptcha(token);

            if (!isRecaptchaValid.success) {
                throw new Error('reCAPTCHA verification failed.');
            }
        
            const userLoginService = new UserLoginService();
            console.log(userData.data)
            const resultItem = await userLoginService.checkUserLogin(userData.data);
            console.log(resultItem)
            res.cookie('user', JSON.stringify({ id: userData.data.id, username: userData.data.username }), {
                httpOnly: true,
                secure: false, // Set to true in production with HTTPS
                maxAge: 24 * 60 * 60 * 1000 // 1 day
              });
            res.status(200).json(resultItem)
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

    async editUserLogin(req, res, next) {
        try {
            const userLoginService = new UserLoginService();
            await userLoginService.updateLogin(req.body, req.params.id);
            res.status(200).json({ status: 200 })
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
