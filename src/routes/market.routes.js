import { Router } from "express";
import {CreateMarket, DeleteMarket, EditStore, AddDislike,AddLike,GetmarketByid, GetMarkets,GetStorebyclient} from '../controllers/market/market.controller';

const router=Router();


router.get('/markets',GetMarkets)

router.put('/addlike',AddLike)
router.put('/notlike',AddDislike)

router.get('/market/:id',GetmarketByid)

router.post('/createmarket',CreateMarket);

router.delete('/dropmarket/:id/:estado',DeleteMarket)

router.put('/editmarket/:id',EditStore)

router.get('/getmarketbyclient/:Iduser',GetStorebyclient)










export default router;


