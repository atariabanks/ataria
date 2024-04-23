const express = require('express');
const app = express()
require('dotenv').config()
require('./models/db')
const userRouter = require('./routes/user')
app.use(express.json())
app.use(userRouter);



app.get('/', (req,res)=>{
res.json({success: true, message: 'welcome to backend'})
})

app.listen(8000, ()=>{
console.log("Port is listining")
});


