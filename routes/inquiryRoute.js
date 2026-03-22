import express from 'express';

const inquiryRouter = express.Router();

import { addInquiry,getInquiries,deleteInquiry } from '../controllers/inquiryController.js';

inquiryRouter.post('/', addInquiry);
inquiryRouter.get('/', getInquiries);
inquiryRouter.delete('/:id', deleteInquiry);


export default inquiryRouter;