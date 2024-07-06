const Admin = require("../../schema/adminschema")
const Books = require("../../schema/bookschema")
const Order = require("../../schema/orderschema")
const Seller = require("../../schema/sellerschema")
const User = require("../../schema/userschema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AdminLogin = async (req,res)=>{
    try {
        const data = req.body
        const check = await Admin.findOne({
            email:data.email
        })
        if(check){
        const check2 = await bcrypt.compare(data.password, check.password)
        if(check2){
            const token = jwt.sign({id:check._id,
                name:check.name,
                emaail:check.email
            },"secret")
            return res.json({
                success:true,
                message:token
            })
            
        }
       return res.json({
            success:false,
            message:"incorrect password",
            data:check
        })
    }
    return res.json({
        success:false,
        message:"user doesnt exist"
    })
    } catch (error) {
        console.log(error)
        res.json({
            sucess:false,
            message:error
        })
    }
}
const AdminGetOrders = async (req,res)=>{
    try {
        const response = await Order.find()
        res.json({
            success:true,
            message:response,
            
        })
    } catch (error) {
        res.json({
            sucess:false,
            message:"Something went wrong"
        })
    }
}
const AdminGetBooks = async (req,res)=>{
    try {
        const response = await Books.find()
        res.json({
            succes:true,
            message:response
        })
    } catch (error) {
        res.json({
            sucess:false,
            message:"Something went wrong"
        })
    }
}
const allUser = async (req,res)=>{
    try {
        const response = await User.find()
        res.json({
            success:true,
            message:response
        })
    } catch (error) {
        res.json({
            sucess:false,
            message:"Something went wrong"
        })
    }
}
const allSellers = async (req,res)=>{
    try {
        const response = await Seller.find()
        res.json({
            success:true,
            message:response
        })
    } catch (error) {
        res.json({
            sucess:false,
            message:"Something went wrong"
        })
    }
}
module.exports={
    AdminGetBooks,
    AdminLogin,
    AdminGetOrders,
    allSellers,
    allUser
}