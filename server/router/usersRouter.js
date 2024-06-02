import express from "express";
import { UserController } from "../controllers/usersController.js";
const usersRouter = express.Router();

const userscontroller = new UserController()

usersRouter.get("/:id", userscontroller.getUserById)
// usersRouter.get("/", userscontroller.getUsers)
usersRouter.post("/", userscontroller.addUser)
// usersRouter.delete("/:id", userscontroller.deleteUser)
// usersRouter.put("/:id", userscontroller.updateUser)

export {
    usersRouter
}