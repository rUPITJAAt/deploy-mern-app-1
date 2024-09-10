const express=require('express')
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const AuthRouter=require('./routes/AuthRouter')
const ProductRouter=require('./routes/ProductRouter')
require('./models/db');
require('dotenv').config();
const PORT=process.env.PORT||8080;
app.get('/',(req,res)=>{
    res.send('hello Ritik kadian')
});

app.use(bodyParser);
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})