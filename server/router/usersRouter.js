import express from "express";
import { UserController } from "../controllers/usersController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const usersRouter = express.Router();

const userscontroller = new UserController()

usersRouter.get("/:id",verifyToken, userscontroller.getUserById)
// usersRouter.get("/", userscontroller.getUsers)
usersRouter.post("/", userscontroller.addUser)
// usersRouter.delete("/:id", userscontroller.deleteUser)
usersRouter.patch("/:id",verifyToken, userscontroller.updateUser)

export {
    usersRouter
}