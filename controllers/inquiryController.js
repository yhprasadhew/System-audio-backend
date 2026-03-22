import express from 'express';
import Inquiry from '../models/inquiry.js'; 
import { IsItCustomer } from './userController.js';

export async function addInquiry(req, res) {
    try {
        if (!IsItCustomer(req)) {
            return res.status(403).json({
                message: "You are not authorized to add inquiries"
            });
        }

        const data = req.body;

        // attach user details
        data.email = req.user.email;
        
 data.phone = req.user.phoneNumber;

        // generate custom id
        let id = 0;
        const lastInquiry = await Inquiry.find().sort({ id: -1 }).limit(1);

        if (lastInquiry.length === 0) {
            id = 1;
        } else {
            id = lastInquiry[0].id + 1;
        }

        data.id = id;

        // save inquiry
        const newInquiry = new Inquiry(data);
        await newInquiry.save();

        res.status(201).json({
            message: "Inquiry added successfully ✅",
            id: newInquiry.id
        });

    } catch (error) {
        res.status(500).json({
            error: "Error adding inquiry",
            details: error.message
        });
    }
}

export async function Inquiries(req, res) {
    try{
        if(IsItCustomer(req)){
            const inquiries = await Inquiry.find({ email: req.user.email });
            return res.json(inquiries);
        }

    }catch(e){
        res.status(500).json({
            message: "Error fetching inquiries"
           
        });
    }
}
