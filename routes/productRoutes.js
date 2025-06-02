import express from "express";
import { addProducts, getProduct, getProducts, removeProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.route('/products').get(getProducts).post(addProducts);

router.route('/products/:id').get(getProduct).patch(updateProduct).delete(removeProduct);

export default router;