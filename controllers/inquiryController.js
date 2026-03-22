import express from 'express';
import Inquiry from '../models/inquiry.js'; 
import { IsItCustomer } from './userController.js';

export async function addInquiry (req, res) => {
    try{
        if(IsItCustomer(req)){
            const data = req.body;
            data.email = req.user.email;
        }else{
            res.status(403).json({
                message: "you are not authorized to add inquiries" });
            return;
        }
        const newInquiry = new Inquiry(data);
        await newInquiry.save();
        res.status(201).json({ message: "Inquiry added successfully ✅" });
    } catch (error) {
        res.status(500).json({ error: "Error adding inquiry" });
    }
}
