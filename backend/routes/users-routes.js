import express from "express";
import userController from "../controllers/users-controller.js";

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.patch("/:uid", userController.updateUserById);

export default router;
