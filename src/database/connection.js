import sql from 'mssql';

const dbsettings={
    user:'SA',
    password:'Brayan12#',
    server:"localhost",
    database:'gstore',
    options:{
        trustServerCertificate: true

    }
}



 export async function getConnection() {

    try {
        const pool=await sql.connect(dbsettings);

        return pool;
        
        
    } catch (error) {
        console.error(error)
        
    }

}

export { sql}