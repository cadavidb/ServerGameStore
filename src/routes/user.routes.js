import { Router } from "express";

import{ user_register,user_login,root}from '../controllers/user/user.controller';



const router=Router();

router.get('/',root)

router.post('/registeruser',user_register),

router.get('/login',user_login)





export default router;