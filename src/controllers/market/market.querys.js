export const query ={

    addLike:"EXEC SP_ADDLIKE @idmarket",
    adddisLike:"EXEC SP_ADDDISLIKE @idmarket",
    Getmarketsbyclient:"SELECT * from [dbo].[market] where owner_market =(@Id)",
    GetmarketbyId:"SELECT namemarket,imgbanner,[description] FROM [dbo].[market] WHERE Id=(@Id)",
    TolistMarkets:'SELECT *FROM GetMarkets',
    Addmarket:'INSERT INTO [dbo].[market] (owner_market,description,imgbanner,namemarket) VALUES (@owner_market,@description,@imgbanner,@namemarket)',
    Dropmarket:'update dbo.market set estado=@estado where Id=(@Id)',
    Editmarket:'UPDATE [dbo].[market] SET description=@description,imgbanner=@imgbanner,namemarket=@namemarket WHERE Id=@Id'
}