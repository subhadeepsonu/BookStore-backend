const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WishlistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    books: { type: Schema.Types.ObjectId, ref: 'Books' },
    createdAt: { type: Date, default: Date.now }
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
module.exports = Wishlist;
