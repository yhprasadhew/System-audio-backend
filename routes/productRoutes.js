import express from 'express';
import { addProduct, getProducts, getProductById, updateProducts, deleteProducts } from '../controllers/productController.js';
import { get } from 'mongoose';

const productRouter = express.Router(); 

productRouter.post('/', addProduct);
productRouter.get('/', getProducts);

// 🔥 ADDED LINE
productRouter.get('/:id', getProductById);

productRouter.put('/:id', updateProducts); 
productRouter.delete('/:id', deleteProducts);

export default productRouter;