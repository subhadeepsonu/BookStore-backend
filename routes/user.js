const express = require("express")
const userRouter = express.Router()
const { UserGetBooks, UserGetOrders, UserAddOrders, UserWishlist, UserAddWishlist, UserLogin, UserSignUp, UserDetails } = require('../controllers/user/userController');
userRouter.get('/books',UserGetBooks)
userRouter.get('/orders',UserGetOrders)
userRouter.post('/addOrders',UserAddOrders)
userRouter.get('/wishlist',UserWishlist)
userRouter.post('/Addwishlist',UserAddWishlist)
userRouter.post('/login',UserLogin)
userRouter.post('/signup',UserSignUp)
userRouter.post('/',UserDetails)
module.exports=userRouter