const express  = require("express")
const { AdminGetOrders, AdminGetBooks, AdminLogin, allUser, allSellers } = require("../controllers/admin/adminController")
const Admin = require("../schema/adminschema")
const adminRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
adminRouter.get('/orders',AdminGetOrders)
adminRouter.get('/books',AdminGetBooks)
adminRouter.post('/login',AdminLogin)
adminRouter.get('/user',allUser)
adminRouter.get('/seller',allSellers)
adminRouter.post('/signup', async (req,res)=>{
    try {
        const data = await req.body
        const check = await Admin.findOne({
            email:data.email
        })
        console.log(check)
        if(check){
            res.json({
                success:false,
                message:"user exists"
            })
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(data.password,salt)
        const response = await Admin.create({
            email:data.email,
            username:data.name,
            password:hash,
            role:"admin"
        })
        const token =  jwt.sign({id:response._id,
            name:response.name,
            email:response.email
        },"secret")
        console.log(token)
        res.json({
            success:true,
            message:token,
            data:response
        })
    } catch (error) {
        console.log(error)
        res.json({
            sucess:false,
            message:"Something went wrong"
        })
    }
    
})
module.exports=adminRouter