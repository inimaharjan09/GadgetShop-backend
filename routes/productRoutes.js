import express from "express";
import { addProducts, getProduct, getProducts, getTop5, removeProduct, updateProduct } from "../controllers/productController.js";
import { notAllowed } from "../utils/notAllowed.js";

const router = express.Router();

router.route('/products').get(getProducts).post(addProducts).all(notAllowed);

router.route('/products/top-5').get(getTop5, getProducts).all(notAllowed);

router.route('/products/:id').get(getProduct).patch(updateProduct).delete(removeProduct).all(notAllowed);

export default router;