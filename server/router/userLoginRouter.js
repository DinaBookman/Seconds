import express from "express";
import { UserLoginController } from "../controllers/userLoginController.js";
const userLoginRouter = express.Router();

const userLoginController = new UserLoginController()

userLoginRouter.post("/",userLoginController.checkUserLogin);
userLoginRouter.get("/",userLoginController.getUserLogin);
export {
    userLoginRouter
}