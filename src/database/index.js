import {getConnection,sql} from './connection';

const BD = async()=> await  getConnection();

const success=(res,msg)=>{

   return res.json({
        ok:true,
        message:msg
    })

}

const fail=(res,msg,code)=>{

    return res.status(code).json({
        ok:false,
        message:msg
    })

}


export {
    BD,
    success,
    fail,
    sql
}