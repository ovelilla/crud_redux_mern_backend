import express from "express";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteManyProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct).delete(deleteManyProducts);

router.route("/:id").put(updateProduct).delete(deleteProduct);

export default router;
