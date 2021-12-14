import {BD, fail, success,sql} from '../../database/index';
import {query} from './market.querys';
const {Addmarket,Dropmarket,addLike,adddisLike,TolistMarkets,Editmarket,Getmarketsbyclient,GetmarketbyId}=query;

export const AddLike=(req,res)=>{


    const {idmarket}=req.body;

    if (!idmarket)  fail(res,'faltan datos!',404);

    BD().then(async db=>{

        const countlikes= await db.request()
        .input("idmarket",sql.Int,idmarket)
        .query(addLike);

        console.log(countlikes.recordset);

        success(res,countlikes.recordset)


    })



    


}

export const AddDislike=(req,res)=>{

    const {idmarket}=req.body;

    if (!idmarket)  fail(res,'faltan datos!',404);

    BD().then(async db=>{

        const countdislikes= await db.request()
        .input("idmarket",sql.Int,idmarket)
        .query(adddisLike);

        console.log(countdislikes.recordset);

        success(res,countdislikes.recordset)


    })

}

export const EditStore=(req,res)=>{

    const {description,imgbanner,namemarket}=req.body;

    const id=req.params.id;
    

    if (!description || !imgbanner || !namemarket)  fail(res,'faltan datos!',404)
    
    BD().then(async db=>{


        const Query= await db.request().query(TolistMarkets);

        const {recordset}=Query;

        if (recordset.length==0)  return fail(res,'no hay tiendas disponibles',404)


         await db.request()
        .input("description",sql.Text,description)
        .input("imgbanner",sql.Text,imgbanner)
        .input("namemarket",sql.VarChar,namemarket)
        .input("Id",sql.Int,id)
        .query(Editmarket);
       

        success(res,'ok,tienda editada')


    }).catch(err=>fail(res,err.toString(),500))



}




export const GetStorebyclient=(req,res)=>{

    //462ms async,


   

    if (!req.params.Iduser) 
    {

        return fail(res,"falta el id",404)
        
    }

  
    BD().then(async db=>{


         const consulta=await db.request()
        .input("Id",sql.Int,req.params.Iduser)
        .query(Getmarketsbyclient)

        
           
        
        if (consulta.recordset.length==0) return fail(res,'no tienes tiendas , crea primero',400);

        
         return res.json({  ok:true, markets:consulta.recordset })

    

        }).catch(err=>fail(res,err.toString(),500))



}



export const DeleteMarket=(req,res)=>{


    const {id,estado}=req.params;
   
    BD().then( async db=>{

        const Query_0= await db.request().query(TolistMarkets);

        const {recordset}=Query_0;

        if (recordset.length==0)fail(res,'no hay tiendas para desactivar',200)

      

        await db.request()
        .input("estado",sql.VarChar,estado)
        .input("Id",sql.Int,id).query(Dropmarket)


        success(res,"tienda desactivada con exito")




    
        
    }).catch(err=>fail(res,err.toString(),500))
    
  

   

    
}




export const CreateMarket=(req,res)=>{

    

    const {Id_own,description,imgbanner,namemarket}=req.body;



    if (!Id_own || !description || !imgbanner || !namemarket) {

        return fail(res,'llena todos los campos!',404)
    }

    BD().then(async db=>{


        await db.request()
        
        .input("owner_market",sql.Int,Id_own)
        .input("description",sql.Text,description)
        .input("imgbanner",sql.Text,imgbanner)
        .input("namemarket",sql.VarChar,namemarket)
        .query(Addmarket);
        
    

        success(res,'ok,tienda creada')




    }).catch(err=>fail(res,err.toString(),500))



}


export const GetmarketByid=(req,res)=>{


    if (!req.params.id) {

        return fail(res,'ruta invalida!',404)
    }

   
    BD().then(async (db)=>{

         const d=await db.request()
        .input("Id",sql.Int,req.params.id)
        .query(GetmarketbyId);
        console.log(d);

        
        

        res.json({ok:true,market:d.recordset})
        


    }).catch(err=>fail(res,err.toString(),500))



}





export const GetMarkets=(req,res)=>{

    //293 ms  asyncrono

    BD().then(  async (db)=>{

        const Query= await db.request().query(TolistMarkets);

        const {recordset}=Query;
        console.log(recordset);

        if (recordset.length==0)  return fail(res,'no hay tiendas disponibles',200)
    
        success(res,recordset)



    }).catch(err=>fail(res,err.toString(),500))

    

}