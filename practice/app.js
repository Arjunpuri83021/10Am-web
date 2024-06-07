const express=require('express')

const App=express()

 const apiRouter=require('./routers/route')


 App.use(apiRouter)
App.listen(5000,()=>{
    console.log('This Is Bussy Server 5000');
})