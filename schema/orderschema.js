const mongoose = require("mongoose")
const Schema = mongoose.Schema
const orderschema = new Schema({
    user:{
        type:Schema.Types.ObjectId,ref:'User',required:true
    },
    books: { type: Schema.Types.ObjectId, ref: 'Books' },
    seller:{type:Schema.Types.ObjectId,ref:'Seller'},
    bookname:{type:String,required:true},
    imgurl:{type:String,required:true},
    createdAt: { type: Date, default: Date.now }
})
const Order = mongoose.model('Order',orderschema)
module.exports=Order;