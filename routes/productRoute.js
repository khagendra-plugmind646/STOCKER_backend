import express from 'express';
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productController.js';
import protect from '../middleWare/authMiddleware.js';
import { upload } from '../utils/fileUpload.js';

const router = express.Router();

router.post("/", protect, upload.single("image"), createProduct);
router.patch("/:id", protect, upload.single("image"), updateProduct);
router.get("/", protect, getAllProducts);
router.get("/:id", protect, getSingleProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
