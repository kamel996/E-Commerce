import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productsControllers.js";
import { protect, admin } from "..//middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProductById).put(protect, admin, updateProduct);
router.route("/:id/review").post(protect, createProductReview);

router.route("/:id").delete(protect, admin, deleteProduct);

export default router;
