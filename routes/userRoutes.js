import express from "express";
import { login, register } from "../controllers/userController.js";
import { notAllowed } from "../utils/shareFunc.js";
import { loginSchema, registerSchema, validates } from "../utils/validator.js";

const router = express.Router();

router.route('/login').post(validates.body(loginSchema), login).all(notAllowed);
router.route('/register').post(validates.body(registerSchema), register).all(notAllowed);

export default router; 