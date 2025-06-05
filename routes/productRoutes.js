import express from "express";
import { addProducts, getProduct, getProducts, getTop5, removeProduct, updateProduct } from "../controllers/productController.js";
import { fileCheck, updateFileCheck } from "../middlewares/checkFile.js";
import { notAllowed } from "../utils/shareFunc.js";
import { checkId } from "../middlewares/checkId.js";
import validate from 'express-joi-validation';
import { productValSchema } from "../utils/validator.js";

const validator = validate.createValidator({  });

const router = express.Router();

router.route('/products').get(getProducts).post(fileCheck, validator.body(productValSchema), addProducts).all(notAllowed);

router.route('/products/top-5').get(getTop5, getProducts).all(notAllowed);

router.route('/products/:id').get(getProduct).patch(checkId, updateFileCheck, updateProduct).delete(checkId, removeProduct).all(notAllowed);

export default router;