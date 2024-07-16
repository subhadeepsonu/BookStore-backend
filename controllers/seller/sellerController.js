const Books = require("../../schema/bookschema")
const Order = require("../../schema/orderschema")
const Seller = require("../../schema/sellerschema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const DeleteBook = async (req,res)=>{
    try {
        const data = await req.body
        const responce = await Books.deleteOne({
            _id:data.id
        })
        console.log(data)
         res.json({
            success:true,
            message:responce
        })
    } catch (error) {
        return   res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}
const SellerGetOrders = async (req,res)=>{
    try {
        const data = await req.body
        if (!data.id) {
            return res.json({
                success: false,
                message: "Seller ID is required"
            });
        }
        const response = await Order.find({
            seller:data.id
        })
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
const SellerGetBooks = async (req,res)=>{
    try {
        const data =  req.body
        const response = await Books.find({
           seller:data.id
        })
        res.json({
            succes:true,
            message:response
        })
    } catch (error) {
        console.log(error)
        res.json({
            sucess:false,
            message:"Something went wrong"
        })
    }
}
const SellerAddBooks = async (req,res)=>{
    try {
        const data = await req.body
        const response = await Books.create({
            author:data.author,
            name:data.name,
            seller:data.seller,
            imgurl:data.imgurl,
            price:data.price,
            discription:data.discription
        })
        res.json({
            success:true,
            message:response
        })
    } catch (error) {
        res.json({
            sucess:false,
            message:error
        })
    }
}
const SellerLogin= async (req,res)=>{
    try {
        const data = req.body
        const check = await Seller.findOne({
            email:data.email
        })
        if(check){
        const check2 = await bcrypt.compare(data.password, check.password)
        if(check2){
            const token = jwt.sign({id:check._id,
                name:check.name,
                email:check.email,
                role:"seller"
            },"secret")
            return res.json({
                success:true,
                message:token,
                data:check
            })
        }
       return res.json({
            success:false,
            message:"incorrect password"
        })
    }
    return res.json({
        success:false,
        message:"user doesnt exist"
    })
    } catch (error) {
        res.json({
            sucess:false,
            message:"Something went wrong"
        })
    }
}
const SellerSignUp = async (req,res)=>{
    try {
        const data = await req.body
        const check = await Seller.findOne({
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
        const response = await Seller.create({
            email:data.email,
            name:data.name,
            password:hash,
            role:"seller"
        })
        console.log("dot")
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
}

module.exports={
    SellerAddBooks,
    SellerGetBooks,
    SellerGetOrders,
    SellerLogin,
    SellerSignUp,
    DeleteBook
}