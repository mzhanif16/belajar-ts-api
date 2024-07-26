import express from "express";
import {UserController} from "../controller/user-controller";

export const router = express.Router();
router.post("/api/users",UserController.register);
router.post("/api/users/login",UserController.login);