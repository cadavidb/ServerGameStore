import { Router } from "express";
import { GetProductsmarket ,Createproduct,DeleteProduct,Editproduct,Getproductbyid} from "../controllers/product/product.controller";
const router=Router();

router.get('/getproductsbymarket/:id',GetProductsmarket);

router.get('/getproductbyid/:Idproduct/:Idmarket',Getproductbyid)


router.post('/createproduct',Createproduct)

router.delete('/deleteproduct/:Idproduct/:codebill',DeleteProduct)

router.put('/editproduct/:Idproduct/:codebill',Editproduct)

export default router;
