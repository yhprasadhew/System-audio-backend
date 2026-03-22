import express from 'express';
import { addProduct,getProducts } from '../controllers/productController.js';
import { get } from 'mongoose';

const productRouter = express.Router(); 
productRouter.post('/', addProduct);
productRouter.get('/',getProducts);


export default productRouter;