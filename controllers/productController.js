import product from '../models/products.js';
import { IsItAdmin } from './userController.js';


export function addProduct(req, res) {
   
    
    if(req.user == null){
        res.status(401).json({
             message: "please login and try again" });
        return;
    }
    
 if(req.user.role != "admin"){
    res.status(403).json({
         message: "you are not authorized to add products" });
    return;
 }

    const data = req.body;
    const newProduct = new product(data);

    
    newProduct.save()
        .then(() => {
            res.json({ message: "Product added successfully ✅ " });
        })
        .catch((error) => {
            res.status(500).json({ error: "Error adding product" });
        });


       
    }
        //get products

        //admin ta availability true and false product enwa
        //user ta availability true  ewa WITHRK product enwa
        export async function getProducts(req, res) {

           

            try{
                if(IsItAdmin (req)){
                    const products = await product.find();
                    res.json(products);
                    return;
                }else{
                    const products = await product.find({availability: true});
                    res.json(products);
                }
                

            } catch (error) {
                res.status(500).json({ message: "failed to get products" });

            }
        
        }

        export async function updateProducts(req, res) {
            try {
                if (IsItAdmin(req)) {
                    const produckey = req.params.key;    //params key yanu paramneter eka url eke amunla ewna bwa
                    const updateData = req.body;
                    await product.updateOne({ key: produckey }, updateData);
                    res.json({ message: "Product updated successfully ✅ " });
                   
                } else {
                    res.status(403).json({ message: "You are not authorized to update products" });
                }
            } catch (error) {
                res.status(500).json({ message: "Failed to update product" });
            }
        }

        
        export async function deleteProducts(req, res) {
            try {
                if (IsItAdmin(req)) {
                    const produckey = req.params.key;   
                    await product.deleteOne({ key: produckey });
                    res.json({ message: "Product deleted successfully ✅ " });      
                }else {
                    res.status(403).json({ message: "You are not authorized to delete products" });
                }
            }catch (error) {
                res.status(500).json({ message: "Failed to delete product" });
            }
        

        }
    

