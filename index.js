const express = require("express")
const userRouter = require("./routes/user")
const sellerRouter = require("./routes/seller")
const adminRouter = require("./routes/admin")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const port = 3000
const app = express()
app.use(bodyParser.json({
    
}))
app.use(cors({
    origin:"*"
}))
mongoose.connect("mongodb+srv://admin:sonumonu@cluster0.qrlr0ai.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true,}
).then(()=>{
    
    console.log("mongoose connected")
}).catch(()=>{

    console.log("Something went wrong")
})
app.use('/user',userRouter)
app.use('/seller',sellerRouter)
app.use('/admin',adminRouter)
app.get("/",(req,res)=>{
    res.json({
        message:"Book Store Backend"
    })
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
