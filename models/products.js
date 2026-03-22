import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    productkey: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        default: "uncategorized"

    },
    availability: {
        type: Boolean,
        required: true,
        default: true

    },image: {
        type: [String],
        required: true,
        default: ["https://www.pngall.com/wp-content/uploads/5/Product-Image-Placeholder-PNG-Picture.png"]
    }

});



const Product = mongoose.model("Product", productSchema);
export default Product;