import express from 'express';
import Inquiry from '../models/inquiry.js'; 
import { IsItAdmin, IsItCustomer } from './userController.js';

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

export async function getInquiries(req, res) {
    try{
        if(IsItCustomer(req)){
            const inquiries = await Inquiry.find({ email: req.user.email });
            res.json(inquiries);
            return;
        }else if(IsItAdmin(req)){
            const inquiries = await Inquiry.find();
            res.json(inquiries);
            return;
         }else{
            return res.status(403).json({
                message: "You are not authorized to view inquiries"
            });
         }

        

    }catch(e){
        res.status(500).json({
            message: "Error fetching inquiries"
           
        });
    }
}

   export async function deleteInquiry(req, res) {
    try {
        const id = req.params.id;

        // 🔹 ADMIN can delete any inquiry
        if (IsItAdmin(req)) {
            await Inquiry.findByIdAndDelete(id);

            return res.json({
                message: "Inquiry deleted successfully ✅"
            });
        }

        // 🔹 CUSTOMER can delete only their own inquiry
        if (IsItCustomer(req)) {
            const inquiry = await Inquiry.findById(id);

            if (!inquiry) {
                return res.status(404).json({
                    message: "Inquiry not found"
                });
            }

            if (inquiry.email !== req.user.email) {
                return res.status(403).json({
                    message: "You are not authorized to delete this inquiry"
                });
            }

            await Inquiry.findByIdAndDelete(id);

            return res.json({
                message: "Inquiry deleted successfully ✅"
            });
        }

        // 🔹 Unauthorized
        return res.status(403).json({
            message: "You are not authorized to delete inquiries"
        });

    } catch (error) {
        res.status(500).json({
            error: "Error deleting inquiry",
            details: error.message
        });
    }
}