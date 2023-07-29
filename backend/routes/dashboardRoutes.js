import express from "express";
import {
  getProducts,
  deleteProduct,
  editProduct,
  updateProduct,
} from "../controller/dashboardController.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(editProduct).delete(deleteProduct).put(updateProduct);

export default router;
