const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WishlistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookname:{
        type:String,
        required:true
    },
    imgurl:{
        type:String,
        required:true
    },
    createdAt: { type: Date, default: Date.now }
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
module.exports = Wishlist;
