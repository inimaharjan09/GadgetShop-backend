import express from 'express';
import {
  addProducts,
  getProduct,
  getProducts,
  getTop5,
  removeProduct,
  reviewProduct,
  updateProduct,
} from '../controllers/productController.js';
import { fileCheck, updateFileCheck } from '../middlewares/checkFile.js';
import { notAllowed } from '../utils/shareFunc.js';
import { checkId } from '../middlewares/checkId.js';
import { productValSchema, validates } from '../utils/validator.js';
import { adminCheck, userCheck } from '../middlewares/userCheck.js';

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(
    userCheck,
    adminCheck,
    validates.body(productValSchema),
    fileCheck,
    addProducts
  )
  .all(notAllowed);

router.route('/top-5').get(getTop5, getProducts).all(notAllowed);

router
  .route('/:id')
  .get(checkId, getProduct)
  .patch(userCheck, adminCheck, checkId, updateFileCheck, updateProduct)
  .delete(userCheck, adminCheck, checkId, removeProduct)
  .all(notAllowed);

router.route('/review/:id').patch(checkId, reviewProduct).all(notAllowed);

export default router;
