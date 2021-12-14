import {BD,success,fail,sql} from '../../database/index';
import {query} from './user.querys';

const {RegisterUser, LogginUser}=query;

export const root=(req,res)=>{
  
  res.json({
    ok:true,
    message:"welcome to this server with node js and sql server"
})
}

export const user_register=(req,res)=>{


        const {name,email,password} = req.body;

    
        if (!name || !email || !password) return fail(res,'campos invalidos',404) 


         BD().then( db=>{

         db.request()
        .input("name",sql.VarChar,name)
        .input("email",sql.VarChar,email)
        .input("password",sql.VarChar,password)
        .query(RegisterUser);


        success(res,' registrado con exito')

        }).catch(err=>fail(res,err.toString(),500))


    
}


export const user_login=(req,res)=>{


       const {email,password} = req.query;


        if ( !email || !password) return fail(res,'campos invalidos',404)
         

         BD().then(async db=>{

            

            const Query=  await db.request()
           .input("email",sql.VarChar,email)
           .input("password",sql.VarChar,password)
           .query(LogginUser);

         if (Query.recordset.length==0) return fail(res,'email o password invalidos',404)

         res.json({
           ok:true,
           message:'exito',
           data:Query.recordset
         })
       // success(res,'logeado con exito')


    }).catch(err=>fail(res,err.toString(),505))

}


 

















