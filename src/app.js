import express from 'express';
import config from '../config';
import cors from 'cors';
const app=express();

//routes app
import user_routes from './routes/user.routes';
import market_routes from './routes/market.routes'
import product_routes from './routes/product.routes'
import provider_routes from './routes/provider.routes';
//end routes


//middlewares

app.use(cors());
app.set('port', config.port);

app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

app.use(user_routes,market_routes,product_routes,provider_routes);

//end middlewares

export default app;