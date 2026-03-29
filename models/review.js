import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({  
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        required: true  
    },
    comment: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    },
    profilepicture: {
        type: String,
        required: true,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
    
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;