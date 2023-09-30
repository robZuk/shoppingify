import express from "express";

import {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addProduct).get(getProducts);

router.route("/:id").get(protect, getProduct).delete(protect, deleteProduct);

export default router;
