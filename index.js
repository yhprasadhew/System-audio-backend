import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import reviewRouter from './routes/reviewRoute.js';
import inquiryRouter from './routes/inquiryRoute.js';

dotenv.config();  //dotenv file eka load krgnnwa
const app = express();

app.use(express.json());
app.use(bodyParser.json());



// ************* middleware ekaki ****

app.use((req, res, next) => {  
    let token = req.header("Authorization");

    if (token != null) {
        token = token.replace("Bearer ", "");
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err) {
                req.user = decoded;
            }
        });
    }

    ;  
    next();
});




// MongoDB connection
let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)
.then(() => console.log("MongoDB Connected successfully ✅ "))
.catch(err => console.log("❌ Mongo Error:", err));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/reviews', reviewRouter);

app.use('/api/inquiries', inquiryRouter);

// Serve
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


  //"email": "prasad@example.com",    admin
  //  "password": "123",

// "email": "john.doe@example.com",
   // "password": "12345678",