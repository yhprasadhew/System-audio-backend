import product from '../models/products.js';
import { IsItAdmin } from './userController.js';

// ✅ ADD PRODUCT
export function addProduct(req, res) {

    if (req.user == null) {
        return res.status(401).json({ message: "please login" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "not authorized" });
    }

    const newProduct = new product(req.body);

    newProduct.save()
        .then(() => res.json({ message: "Product added ✅" }))
        .catch(() => res.status(500).json({ error: "Error adding product" }));
}


// ✅ GET ALL PRODUCTS
export async function getProducts(req, res) {
    try {
        if (IsItAdmin(req)) {
            const products = await product.find();
            return res.json(products);
        } else {
            const products = await product.find({ availability: true });
            return res.json(products);
        }
    } catch {
        res.status(500).json({ message: "failed to get products" });
    }
}


// ✅ 🔥 GET PRODUCT BY ID (IMPORTANT FOR EDIT)
export async function getProductById(req, res) {
    try {
        const id = req.params.id;

        const item = await product.findById(id);

        if (!item) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(item);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get product" });
    }
}


// ✅ 🔥 UPDATE PRODUCT (FIXED)
export async function updateProducts(req, res) {
    try {
        if (!IsItAdmin(req)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const id = req.params.id;

        const updated = await product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.json(updated);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update product" });
    }
}


// ✅ 🔥 DELETE PRODUCT (FIXED)
export async function deleteProducts(req, res) {
    try {
        if (!IsItAdmin(req)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const id = req.params.id;

        await product.findByIdAndDelete(id);

        res.json({ message: "Product deleted ✅" });

    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
}