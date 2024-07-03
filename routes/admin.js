const express  = require("express")
const { AdminGetOrders, AdminGetBooks, AdminLogin, allUser, allSellers } = require("../controllers/admin/adminController")
const adminRouter = express.Router()
adminRouter.get('/orders',AdminGetOrders)
adminRouter.get('/books',AdminGetBooks)
adminRouter.post('/login',AdminLogin)
adminRouter.get('/user',allUser)
adminRouter.get('/seller',allSellers)
module.exports=adminRouter