import express from 'express';
import { contactUs } from '../controllers/contactController.js';
import protect from '../middleWare/authMiddleware.js';

const router = express.Router();

router.post("/", protect, contactUs);

export default router;
