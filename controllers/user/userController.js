const Books = require( "../../schema/bookschema");
const Order = require("../../schema/orderschema");
const User = require("../../schema/userschema");
const Wishlist = require("../../schema/wishistschema");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Deletewishlist = async(req,res)=>{
    try {
        const data = await req.body
        console.log(data)
        const response = await Wishlist.deleteOne({
            _id:req.body.id
        })
        console.log(response)
        res.json({
            success:true,
            message:response
        })
    } catch (error) {
        res.json({
            success:false,
            message:`${error}`
        })
    }
}
const DeleteOrder = async (req,res)=>{
    try {
        const data = await req.body
        const response = await Order.deleteOne({
           _id:data.id
        })
        res.json({
            success:true,
            message:response
        })
    } catch (error) {
        res.json({
            success:false,
            message:`${error}`
        })
    }
}
const UserGetBooks = async (req,res)=>{
    try {
        const responce =  await Books.find();
        res.json({
            success:true,
            message:responce
        })
    } catch (error) {
        res.json({
            success:false,
            message:"something went wrong"
        })
    }
}
const UserGetOrders = async (req,res)=>{
    try {
        const data = await req.body
        console.log(data)
        const response = await Order.find(
            {
                user:data.id
            }
        )
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
const UserAddOrders = async (req,res)=>{
    try {
        const data = await req.body
        const response  = await Order.create({
            books:data.books,
            seller:data.seller,
            user:data.user,
            bookname:data.bookname,
            imgurl:data.imgurl
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
const UserWishlist = async (req,res)=>{
    try {
        const data = await req.body
        const responce = await Wishlist.find({
            user:data.id
        })
        res.json({
            success:true,
            message:responce
        })
    } catch (error) {
        res.json({
            sucess:false,
            message:"Something went wrong"
        })
    }
}
const UserAddWishlist = async (req,res)=>{
    try {
        const data = await req.body
        console.log(data)
        const response = await Wishlist.create({
            bookname:data.bookname,
            user:data.user,
            imgurl:data.imgurl
        })
        
        return res.json({
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
const UserLogin = async (req,res)=>{
    try {
        const data = req.body
        const check = await User.findOne({
            email:data.email
        })
        if(check){
        const check2 = await bcrypt.compare(data.password, check.password)
        if(check2){
            const token = jwt.sign({id:check._id,
                role:"user",
                name:check.username,
                email:check.email,
                address:check.address
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
       return res.json({
            sucess:false,
            message:"Something went wrong"
        })
    }
}
const UserSignUp = async (req,res)=>{
    try {
        const data = await req.body
        const check = await User.findOne({
            email:data.email
        })
        console.log(check)
        if(check){
           return res.json({
                success:false,
                message:"user exists"
            })
            
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(data.password,salt)
        const response = await User.create({
            email:data.email,
            password:hash,
            username:data.name,
            address:data.address
        })
        
        const token =  jwt.sign({id:response._id,
            email:response.email,
            name:response.name,
            address:response.address
        },"secret")
        
      return   res.json({
            success:true,
            message:token,
            data:response
        })
    } catch (error) {
        
        return res.json({
            sucess:false,
            message:"Something went wrong"
        })
    }
}

const UserDetails = async (req, res) => {
    try {
        const token = req.body.token; 
        const decoded = jwt.verify(token, "secret");
        const userId = decoded.id; 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, message: user });
    } catch (error) {
        console.error('Error in UserDetails:', error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};
module.exports = {UserGetBooks,UserGetOrders,UserAddOrders,UserWishlist,UserAddWishlist,UserLogin,UserSignUp,UserDetails,DeleteOrder,Deletewishlist}