const express = require("express")
const { SellerGetBooks, SellerGetOrders, SellerLogin, SellerSignUp, SellerAddBooks } = require("../controllers/seller/sellerController")
const sellerRouter = express.Router()
sellerRouter.post('/orders',SellerGetOrders)
sellerRouter.post('/books',SellerGetBooks)
sellerRouter.post('/login',SellerLogin)
sellerRouter.post('/signup',SellerSignUp)
sellerRouter.post('/addBook',SellerAddBooks)
module.exports=sellerRouter