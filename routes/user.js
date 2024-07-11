const express = require("express")
const userRouter = express.Router()
const { UserGetBooks, UserGetOrders, UserAddOrders, UserWishlist, UserAddWishlist, UserLogin, UserSignUp, UserDetails, DeleteOrder, Deletewishlist } = require('../controllers/user/userController');
userRouter.get('/books',UserGetBooks)
userRouter.post('/orders',UserGetOrders)
userRouter.post('/addOrders',UserAddOrders)
userRouter.post('/wishlist',UserWishlist)
userRouter.post('/Addwishlist',UserAddWishlist)
userRouter.post('/deletewishlist',Deletewishlist)
userRouter.post('/login',UserLogin)
userRouter.post('/signup',UserSignUp)
userRouter.post('/',UserDetails)
userRouter.post('/deleteorder',DeleteOrder)
module.exports=userRouter