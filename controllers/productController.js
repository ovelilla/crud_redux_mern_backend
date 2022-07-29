import mongoose from "mongoose";
import Product from "../models/Product.js";
import FormError from "../helpers/FormError.js";
import Alert from "../helpers/Alert.js";

export const getProducts = async (req, res) => {
    const products = await Product.find();

    res.json(products);
};

export const createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    const errors = [];

    if (!name) {
        const error = new FormError("El nombre es obligatorio", "name");
        errors.push(error);
    }

    if (!description) {
        const error = new FormError("La descripción es obligatoria", "description");
        errors.push(error);
    }

    if (!price) {
        const error = new FormError("La precio es obligatorio", "price");
        errors.push(error);
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const product = new Product(req.body);

    try {
        const savedProduct = await product.save();
        const alert = new Alert("success", "Producto creado correctamente");
        res.json({ alert, product: savedProduct });
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const {
        Types: {
            ObjectId: { isValid },
        },
    } = mongoose;

    if (!isValid(id)) {
        const error = new Error("Id no válido");
        return res.status(404).json({ message: error.message });
    }

    const { name, description, price } = req.body;
    const errors = [];

    if (!name) {
        const error = new FormError("El nombre es obligatorio", "name");
        errors.push(error);
    }

    if (!description) {
        const error = new FormError("La descripción es obligatoria", "description");
        errors.push(error);
    }

    if (!price) {
        const error = new FormError("La precio es obligatorio", "price");
        errors.push(error);
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors });
    }

    const product = await Product.findById(id);

    if (!product) {
        const alert = new Alert("error", "Producto no encontrado");
        return res.status(404).json({ alert });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;

    try {
        const updatedProduct = await product.save();
        const alert = new Alert("success", "Producto actualizado correctamente");
        res.json({ alert, product: updatedProduct });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const {
        Types: {
            ObjectId: { isValid },
        },
    } = mongoose;

    if (!isValid(id)) {
        const error = new Error("Id no válido");
        return res.status(404).json({ message: error.message });
    }

    const product = await Product.findById(id);

    if (!product) {
        const error = new Error("Producto no encontrado");
        return res.status(404).json({ message: error.message });
    }

    try {
        await product.deleteOne();
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteManyProducts = async (req, res) => {
    try {
        await Product.deleteMany({ _id: { $in: req.body.selected } });
        res.json({ message: "Productos eliminados" });
    } catch (error) {
        console.log(error);
    }
};
