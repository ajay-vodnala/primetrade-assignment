import express from 'express';
import {userRegister,userLogin,getUserDetails,updateUserDetails} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router=express.Router();

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/profile-details',verifyToken,getUserDetails);
router.put('/edit-profile',verifyToken,updateUserDetails);

export default router;