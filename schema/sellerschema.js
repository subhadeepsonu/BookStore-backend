const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SellerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Seller = mongoose.model('Seller', SellerSchema);
module.exports = Seller;
