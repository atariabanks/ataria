const express = require('express');
const app = express()

const PORT = process.env.PORT || 8080

require('dotenv').config()
require('./models/db')
const userRouter = require('./routes/user')
app.use(express.json())
app.use(userRouter);



app.get('/', (req,res)=>{
res.json({success: true, message: 'welcome to backend'})
})

app.listen(PORT, ()=>{
console.log("Port is listining")
});


