import {BD,fail,sql,success} from '../../database/index';
import {querys} from './provider.querys';
const {createprovider,getprovidersbyclient,updateprovider,deleteprovider}=querys;

export const Getprovidersbyclient=(req,res)=>{

    const {Iduser}=req.params;
    
    
    if (!Iduser) return fail(res,"faltan el id del cliente",404);

    BD().then(async (database)=>{
       const providers= await database.request()
        .input("Id",sql.Int,Iduser)
        .query(getprovidersbyclient);

        success(res,providers.recordset);

    }).catch(err=>fail(res,err.toString(),500))

    
    




}


export const Createprovider=(req,res)=>{

    const {email,name,phone,Idclient}=req.body;

    if (!email || !name || !phone || !Idclient) return fail(res,"faltan datos",404)
//178ms sin async ,

    BD().then(async (database)=>{
         await database.request()
        .input("email",sql.VarChar,email)
        .input("name",sql.VarChar,name)
        .input("phone",sql.VarChar,phone)
        .input("clientId",sql.Int,Idclient)
        .query(createprovider)

        success(res,"proveedor guardado")

    })



    


    



}

export const Editprovider=(req,res)=>{

    const {email,name,phone,Idprovider}=req.body;

    if (!email || !name || !phone || !Idprovider) return fail(res,"faltan datos",404)
    

    BD().then(async (database)=>{
          database.request()
        .input("email",sql.VarChar,email)
        .input("name",sql.VarChar,name)
        .input("phone",sql.VarChar,phone)
        .input("Idprovider",sql.Int,Idprovider)
        .query(updateprovider)

        success(res,"proveedor actualizado")

    })






}

export const DeleteProvider=(req,res)=>{

    const {Idprovider}=req.params;
    
    
    if (!Idprovider) return fail(res,"faltan el id del cliente",404);

    BD().then(async (database)=>{
        await  database.request()
       .input("Idprovider",sql.Int,Idprovider)
       .query(deleteprovider)

       success(res,"proveedor eliminado")

   })




}