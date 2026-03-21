
import Review from '../models/review.js';


export function addReview(req, res) {
    if(req.user == null){
        res.status(401).json({
             message: "please login and try again" });
        return;
    }

    const data = req.body;

    data.name = req.user.firstName + " " + req.user.lastName;    //request eka dna user ge nma enwa
   data.email = req.user.email;  //request eka dna user ge email enwa
   data.profilepicture = req.user.profilepicture;  //request eka dna user ge profile picture enwa

    const newReview = new Review(data);
    newReview.save()
        .then(() => {
            res.json({ message: "Review added successfully ✅ " });
        })
        .catch((error) => {
            res.status(500).json({ error: "Error adding review" });
        });

    }



    export function getReviews(req, res) {
        const user = req.user;  //request eka dna user enwa

        if (user == null || user.role != 'admin') {
         Review.find({isApproved: true}).then((reviews) => {
            res.json(reviews);
        })
        return;
    }

    if (user.role === 'admin') {
        Review.find().then((reviews) => {
            res.json(reviews);
        });

    }
}



    export function deleteReview(req, res) {


        const email = req.params.email; //ena kenage email check

        if (req.user == null ){
            res.status(401).json({
                message: "please login and try again" });
            return;

        }
            if(req.user.role == "customer"){   //thmn dpu review can  delete
              
                if(req.user.email == email){  
                    Review.deleteOne({ email: email }).then(() => {
                        res.json({ message: "Review deleted successfully ✅ " });
                    }).catch((error) => {
                        res.status(500).json({ error: "Error deleting review" });
                    }
                    );
                }else{
                    res.status(403).json({
                        message: "you are not authorized to delete this review" });
                    return;
                }   
            }   

         
        if(req.user.role == "admin"){   //admin can delete any review

        Review.deleteOne({ email: email }).then(() => {
            res.json({ message: "Review deleted successfully ✅ " });
        }).catch((error) => {
            res.status(500).json({ error: "Error deleting review" });
        });
        

    }
}
    //apu reiews  khmd approve krnne

    export function approveReview(req, res) {
        const email = req.params.email; //ena kenage email check

        if (req.user == null ){
            res.status(401).json({
                message: "please login and try again" });
            return;
        }
        if(req.user.role == "admin"){
            Review.updateOne(                             
                { email: email },
                 { isApproved: true })   //hard *update  krnwa email(email check) and approved changed tofalse to true
                    .then(() => {

                res.json({ message: "Review approved successfully ✅ " });
            }).catch((error) => {
                res.status(500).json({ error: "Error approving review" });
            });
        }else{
            res.status(403).json({
                message: "you are not authorized to approve reviews" });
            return;
        }
    }  
 
