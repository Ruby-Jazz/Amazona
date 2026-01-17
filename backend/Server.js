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
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // Allow any subdomain of vercel.app and your local development
    if (origin.endsWith('.vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Crucial if you are using cookies/sessions for login
}));
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