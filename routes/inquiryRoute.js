import express from 'express';

const inquiryRouter = express.Router();

import { addInquiry } from '../controllers/inquiryController.js';

inquiryRouter.post('/', addInquiry);


export default inquiryRouter;