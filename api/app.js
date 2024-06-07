const express=require('express') 
const app = express()
const cors = require('cors');

const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/10AmTechno').then(()=>{
    console.log("database is coonected to 10AmTechno")
}).catch((error)=>{
  console.log(`error in mongoose connection ${error}`)
})

const ApiRouter=require('./routers/routes')

app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use(cors());
app.use("/admin",ApiRouter)

const PORT = 5000

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})