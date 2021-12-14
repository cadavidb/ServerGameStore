export const query ={

    editproduct:`UPDATE [dbo].[product] 
    SET name=@name,imgproduct=@imgproduct,description=@description WHERE Id=@Id`,

    editbilldetail:`UPDATE [dbo].[DetailBillPurchase] 
    SET amount=@amount,purchase_price=@purchase_price,sale_price=@purchase_price WHERE code_product=@code_product and code_billPurchase=@codebill

    UPDATE [dbo].[billPurchase]
    SET
        [total_cost]=(SELECT SUM (purchase_price) suma FROM [dbo].[DetailBillPurchase] WHERE code_billPurchase=@codebill)
      
    WHERE Id=@codebill

    `,


    deleteproduct:` 
    if(SELECT COUNT(*) FROM [dbo].[DetailBillPurchase] WHERE code_billPurchase=(@codebill))=1
  
    begin
   
    UPDATE [dbo].[billPurchase]
    SET
        [total_cost]=(SELECT SUM (purchase_price) suma FROM [dbo].[DetailBillPurchase] WHERE code_billPurchase=@codebill)-(SELECT purchase_price FROM [dbo].[DetailBillPurchase] WHERE  code_product=(@code_product))
      
    WHERE Id=@codebill

    DELETE FROM [dbo].[DetailBillPurchase] WHERE code_product=(@code_product);
    DELETE FROM [dbo].[product] WHERE Id=(@code_product);
    DELETE FROM [dbo].[billPurchase] WHERE Id=(@codebill)

   
    end
    else

    UPDATE [dbo].[billPurchase]
    SET
        [total_cost]=(SELECT SUM (purchase_price) suma FROM [dbo].[DetailBillPurchase] WHERE code_billPurchase=@codebill)-(SELECT purchase_price FROM [dbo].[DetailBillPurchase] WHERE  code_product=(@code_product))
      
    WHERE Id=@codebill
    
    DELETE FROM [dbo].[DetailBillPurchase] WHERE code_product=(@code_product);
    DELETE FROM [dbo].[product] WHERE Id=(@code_product);


    `,

    GetProductById:
    `SELECT p.name as namegame,
    p.Id,
    dbp.sale_price,
    dbp.purchase_price,
    p.[description],
    p.imgproduct as imgame ,
    dbp.code_billPurchase as codebill,
    dbp.units_avaliable as cantidad
    FROM product P
    INNER JOIN  DetailBillPurchase dbp ON p.Id= dbp.code_product
    INNER JOIN billPurchase bp ON bp.Id=dbp.code_billPurchase and bp.id_tienda=(@Idmarket) and dbp.code_product=(@Idproduct)
    `,

    ToListProductsMarket:`
    SELECT p.name,
    p.Id,
    dbp.sale_price,
    dbp.purchase_price,
    p.[description],
    dbp.code_billPurchase as codebill,
    p.imgproduct ,
    dbp.units_avaliable as stock 
    FROM product P
    INNER JOIN  DetailBillPurchase dbp ON p.Id= dbp.code_product
    INNER JOIN billPurchase bp ON bp.Id=dbp.code_billPurchase and bp.id_tienda=(@Id)`,

    
    createProduct:`INSERT INTO [dbo].[product] (name,description,imgproduct) VALUES (@namegame,@description,@image) SELECT SCOPE_IDENTITY()`,
    insertdetailbill:
    `
    INSERT INTO [dbo].[DetailBillPurchase]( code_product,code_billPurchase,amount,purchase_price,sale_price,units_avaliable)
    VALUES(@code_product,@codebill,@amount,@purchase_price,@sale_price,@amount)
    `
    ,




updatebill: ` INSERT INTO [dbo].[DetailBillPurchase]( code_product,code_billPurchase,amount,purchase_price,sale_price,units_avaliable)
VALUES(@code_product,(SELECT Id FROM billPurchase 
WHERE Fecha=(@date) AND id_tienda=(@id_store) AND id_provider=(@id_provider)),@amount,@purchase_price,@sale_price,@amount)`
    ,



    createbillpurchase:
    `
 if not  exists (SELECT *FROM billPurchase  as BP WHERE Fecha=(@date) AND id_tienda=(@id_store) AND id_provider=(@id_provider)) 
    begin
    INSERT INTO [dbo].[billPurchase]( [Fecha], [id_tienda], [id_provider],[total_cost])
    VALUES( @date, @id_store, @id_provider,@total) 
    SELECT SCOPE_IDENTITY()
    end
    `

}


