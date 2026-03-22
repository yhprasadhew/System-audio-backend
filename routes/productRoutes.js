import express from 'express';
import { addProduct,getProducts,updateProducts  ,deleteProducts} from '../controllers/productController.js';
import { get } from 'mongoose';

const productRouter = express.Router(); 
productRouter.post('/', addProduct);
productRouter.get('/',getProducts);
productRouter.put('/:id', updateProducts); 
productRouter.delete('/:id', deleteProducts);


export default productRouter;