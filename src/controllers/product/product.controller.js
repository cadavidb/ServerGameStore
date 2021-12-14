import {BD, fail, success,sql} from '../../database/index';
var dateTime = require('node-datetime');

import {query} from './product.query';

const { insertdetailbill,ToListProductsMarket,updatebill,createProduct,createbillpurchase,deleteproduct,editproduct,editbilldetail,GetProductById}=query;
export const Getproductbyid=(req,res)=>{

    if (!req.params.Idproduct || !req.params.Idmarket) {

        return fail(res,'ruta invalida!',404)
    }
    
    BD().then(  async database=>{
        //Id=(@Id)
        const product=await database.request()
        .input("Idproduct",sql.Int,req.params.Idproduct)
        .input("Idmarket",sql.Int,req.params.Idmarket)
       .query(GetProductById);

    
        success(res,product.recordset,200)


       }).catch(err=>fail(res,err.toString(),500))

}
    
export const GetProductsmarket=(req,res)=>{


    if (!req.params.id) {

        return fail(res,'ruta invalida!',404)
    }
    console.log(req.params.id);

    BD().then(  async database=>{
        //Id=(@Id)
        const productsmarket=await database.request().input("Id",sql.Int,req.params.id)
       .query(ToListProductsMarket);

    
        success(res,productsmarket.recordset,200)

       


       }).catch(err=>fail(res,err.toString(),500))


    




}

export const Createproduct=(req,res)=>{

   // 3006000100
    const {  
        namegame,
        description,    
        image,
        id_store,
        id_provider,
        purchase_price,
        sale_price,
        amount,
        
        }=req.body;
    
     if (!namegame || !description || !image || !id_store || !id_provider || !purchase_price || !sale_price || !amount) return fail(res,"faltan datos",404)

     var dt = dateTime.create();
     var date = dt.format('Y-m-d');


        BD().then(async (connection)=>{

            const product= await connection.request()
            .input("namegame",sql.VarChar,namegame)
            .input("description",sql.VarChar,description)
            .input("image",sql.VarChar,image)
            .query(createProduct)

            const idproduct=product.recordset[0][""];
            const total=purchase_price*amount

           const codebill= await connection.request()
             .input("date",sql.Date,date)
             .input("id_store",sql.Int,id_store)
             .input("id_provider",sql.Int,id_provider)
             .input("total",sql.Decimal,total)
            .query(createbillpurchase)
            .then(async(data)=>{
                if (!data.recorset) {
                 await connection.request()
                .input("purchase_price",sql.Decimal,purchase_price)
                .input("sale_price",sql.Decimal,sale_price)
                .input("amount",sql.TinyInt,amount)
                .input("code_product",sql.Int,idproduct)
                .input("date",sql.Date,date)
                .input("id_store",sql.Int,id_store)
                .input("id_provider",sql.Int,id_provider)
                .input("total",sql.Decimal,total)
                .query(updatebill)
                
                success(res,"producto creado")
                   
                }else{

                     await connection.request()
                    .input("codebill",sql.Int,codebill.recordset[0][""])
                    .input("purchase_price",sql.Decimal,purchase_price)
                    .input("sale_price",sql.Decimal,sale_price)
                    .input("amount",sql.TinyInt,amount)
                    .input("code_product",sql.Int,idproduct)
                    .query(insertdetailbill)

                success(res,"producto creado")

                }
                

            })

           

    

                 
    


        })





        



}



export const Editproduct=(req,res)=>{

    const {Idproduct,codebill}=req.params;
    
    const{  
        namegame,
        description,    
        image,
        purchase_price,
        sale_price,
        amount,
        }=req.body;

    

    if (!Idproduct || !codebill || !namegame || !description || !image)
     {

        return fail(res,"faltan datos",404)

     }
    


    


        BD().then(async (connection)=>{

             await connection.request()
            .input("name",sql.VarChar,namegame)
            .input("description",sql.VarChar,description)
            .input("imgproduct",sql.VarChar,image)
            .input("Id",sql.Int,Idproduct)
            .query(editproduct).then(async({rowsAffected})=>{
                

               if (rowsAffected[0]==0)
               {
               return fail(res,"no se editó ,datos erroneos",404)

               }else{

                await connection.request()

                .input("codebill",sql.Int,codebill)
                .input("code_product",sql.Int,Idproduct)
                .input("purchase_price",sql.Decimal,purchase_price)
                .input("sale_price",sql.Decimal,sale_price)
                .input("amount",sql.TinyInt,amount)
                .query(editbilldetail)

                .then(({rowsAffected})=>{
    
                if (rowsAffected[0]==0)

                   {
                   return fail(res,"no se editó ,datos erroneos",404)
                   }
                  else

                    { 
                    return success(res,"producto editado")
                    }
    
                })


               }
            
            })


        }).catch(err=>fail(res,err.toString(),500))
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// CREATE TABLE [dbo].[DetailBillPurchase](
// 	[Id] [int] IDENTITY(1,1) NOT NULL,
// 	[code_product] [int] NULL,
// 	[code_billPurchase] [int] NULL,
// 	[amount] [tinyint] NULL,
// 	[purchase_price] [decimal](10, 3) NOT NULL,
// 	[sale_price] [decimal](10, 3) NOT NULL,
// 	[units_avaliable] [int] NULL
// ) ON [PRIMARY]
// GO
// ALTER TABLE [dbo].[DetailBillPurchase] ADD  DEFAULT ((0)) FOR [purchase_price]
// GO
// ALTER TABLE [dbo].[DetailBillPurchase] ADD  DEFAULT ((0)) FOR [sale_price]
// GO
// ALTER TABLE [dbo].[DetailBillPurchase]  WITH CHECK ADD FOREIGN KEY([code_product])
// REFERENCES [dbo].[product] ([Id])
// GO
// ALTER TABLE [dbo].[DetailBillPurchase]  WITH CHECK ADD FOREIGN KEY([code_billPurchase])
// REFERENCES [dbo].[billPurchase] ([Id])
// GO
// ALTER TABLE [dbo].[DetailBillPurchase]  WITH CHECK ADD FOREIGN KEY([code_product])
// REFERENCES [dbo].[product] ([Id])
// GO
// ALTER TABLE [dbo].[DetailBillPurchase]  WITH CHECK ADD FOREIGN KEY([code_billPurchase])
// REFERENCES [dbo].[billPurchase] ([Id])
// GO


}









export const DeleteProduct=(req,res)=>{


    const {Idproduct,codebill}=req.params;
    
    
    if (!Idproduct || !codebill) return fail(res,"falta el id del producto o el id de la factura",404);

    BD().then(async (database)=>{
        await  database.request()
       .input("code_product",sql.Int,Idproduct)
       .input("codebill",sql.Int,codebill)
       .query(deleteproduct).then(({rowsAffected})=>{
           if (rowsAffected[0,0]==0)
           {
            fail(res,"no existe alguno de los id",404)
           }
           else
           { success(res,"producto eliminado") }

       })

     

   })



}