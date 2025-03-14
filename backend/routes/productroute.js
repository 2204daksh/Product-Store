import express from "express"
import { deleteProduct, getAllProducts, getProducts, updateProduct } from "../controllers/productcontroller.js";

const router = express.Router();

router.post("/", getProducts)
router.delete("/:id", deleteProduct)
router.get("/", getAllProducts)
router.put("/:id", updateProduct)

export default router