export const querys={

    deleteprovider:"DELETE FROM [dbo].[provider] WHERE  Id=(@Idprovider)",

    updateprovider:"update dbo.provider set name=@name,email=@email,phone=@phone where Id=(@Idprovider)",

    getprovidersbyclient:"SELECT * from [dbo].[provider] where clientId =(@Id)",

    createprovider:'INSERT INTO [dbo].[provider] (email,name,phone,clientId) VALUES (@email,@name,@phone,@clientId)'
 }