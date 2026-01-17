import express from 'express'
import mongoose from 'mongoose';
import userRouter from './Routers/UserRouter.js';
import dotenv from 'dotenv'
import productRouter from './Routers/ProductRouter.js';
import orderRouter from './Routers/OrderRouter.js';
import cors from 'cors'
dotenv.config();
 const port = process.env.port;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const corsOptions = {
    origin : 'https://amazona-udid.vercel.app',
    credentials : true,
}
app.use(cors(corsOptions))
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('connected to MongoDb')).catch((err)=>console.log(err.reason));
app.use('/api/users', userRouter)
app.use('/api/products',productRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID);
})
app.get('/', (req,res)=>{
    res.send('Server is Ready')
})

app.use((err,req,res,next)=>{
    res.status(500).send({message: err.message});
    
})
app.listen (port, ()=>
{
    console.log(`Server is running at http://localhost:${port}`)
}
)