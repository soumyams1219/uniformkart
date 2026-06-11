import { deleteProduct, getFeaturedProducts, getProductById, getProducts, productCreate, updateProduct } from "../controllers/productController.js";
import { Router } from "express";

const router = Router();

router.post("/product-create",productCreate);
router.get("/get-product",getProducts);
router.get("/get-product-id/:id",getProductById);
router.put("/update-product/:id",updateProduct);
router.delete("/delete-product/:id",deleteProduct);
router.get("/get-featured-product",getFeaturedProducts);

export default router;