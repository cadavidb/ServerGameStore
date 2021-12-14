export const query= {

    RegisterUser:"INSERT INTO [dbo].[user] (name,email,password) VALUES (@name,@email,@password)",
    LogginUser:"select * from [dbo].[user] where email = (@email) and password=(@password)"
   
}