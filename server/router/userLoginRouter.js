import express from "express";
import { UserLoginController } from "../controllers/userLoginController.js";
import { verifyRecaptcha } from "../middleware/verifyRecaptcha.js";

const userLoginRouter = express.Router();

const userLoginController = new UserLoginController()


userLoginRouter.post("/",verifyRecaptcha,userLoginController.checkUserLogin);
userLoginRouter.patch("/:id",userLoginController.editUserLogin);
userLoginRouter.get("/",verifyRecaptcha,userLoginController.getUserLogin);
userLoginRouter.post("/refreshToken", userLoginController.refreshToken)
userLoginRouter.post('/:username/sendCode', userLoginController.sendCode);
userLoginRouter.post('/:username/resetPassword', userLoginController.resetPassword);
export {
    userLoginRouter
}