import express from "express";
import { addReview,getReviews ,deleteReview, approveReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post('/', addReview);
reviewRouter.get('/', getReviews);
reviewRouter.put('/approve/:email', approveReview);


//reviewRouter.get('/:name', (req, res) => {   
   // console.log(req.params.name);     //name kiyna eka terminal eke print krnwa
 

//reviewRouter.delete('/:email', deleteReview);



    export default reviewRouter;