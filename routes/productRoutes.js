import express from "express";
import { addProducts, getProduct, getProducts, getTop5, removeProduct, updateProduct } from "../controllers/productController.js";
import { fileCheck, updateFileCheck } from "../middlewares/checkFile.js";
import { notAllowed } from "../utils/shareFunc.js";
import { checkId } from "../middlewares/checkId.js";
import { productValSchema, validates } from "../utils/validator.js";
import { userCheck } from "../middlewares/userCheck.js";

const router = express.Router();

router.route('/').get(getProducts).post(userCheck, validates.body(productValSchema), fileCheck, addProducts).all(notAllowed);

router.route('/top-5').get(getTop5, getProducts).all(notAllowed);

router.route('/:id').get(getProduct).patch(checkId, updateFileCheck, updateProduct).delete(checkId, removeProduct).all(notAllowed);

export default router;