import { Router } from "express";
const router=Router();
import {Getprovidersbyclient,Createprovider,DeleteProvider,Editprovider} from '../controllers/provider/provider.controller';

router.get('/getprovidersbyclient/:Iduser',Getprovidersbyclient)
router.post('/createprovider',Createprovider)
router.put('/editprovider',Editprovider)
router.delete('/deleteprovider/:Idprovider',DeleteProvider)

export default router;