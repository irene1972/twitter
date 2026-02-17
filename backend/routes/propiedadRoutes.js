import express from 'express';
import {
    envioEmail,
    getUsers
} from '../controllers/propiedadController.js';

const router=express.Router();

router.get('/',envioEmail);
router.get('/usuarios',getUsers);

export default router;