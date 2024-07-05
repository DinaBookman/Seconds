

import { UsersService } from "../service/usersService.js";
import { UserLoginService } from "../service/userLoginService.js";

export class UserController {

    async getUserById(req, res, next) {
        try {
            const usersService = new UsersService();
            const resultItem = await usersService.getUserById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addUser(req, res, next) {
        try {
            const usersService = new UsersService();
            const {name,email ,phone ,rating ,reviews,username,password}=req.body;
            const resultItem = await usersService.addUser({name:name,email:email ,phone:phone ,rating:rating ,reviews:reviews});
            const userId=  resultItem.insertId;
            const userLoginService = new UserLoginService();
            await userLoginService.addUserLogin( {id:userId, username:username,password:password  });
            res.status(200).json(userId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res, next) {
        try {
            const usersService = new UsersService();
            await usersService.updateUser(req.body, req.params.id);
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