
import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({ 

    id: {
        type: Number,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true ,
        
    },
    message : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    phone :{
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true,
        default: "No response yet"
    }

});

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;