const dotenv=require('dotenv');
const express=require('express');
const cors=require('cors');
const connectDb=require('./utils/db.js');
const healthRoutes = require('./routes/healthz.js');
const linkRoutes = require('./routes/link.js');
const redirectRoutes = require('./routes/redirect.js');
const path=require('path');
const app=express();
dotenv.config();
const port=process.env.PORT;
connectDb();
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());


app.use('/healthz',healthRoutes);
app.use('/links',linkRoutes);
app.use('/',redirectRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.get('/',(req,res)=>{
    res.send('hii');
})
app.listen(port,()=>{
    console.log(`listening at ${port}`)
})