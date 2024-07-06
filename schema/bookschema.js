const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BooksSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
    createdAt: { type: Date, default: Date.now },
    imgurl:{type:String,required:true}
});

const Books = mongoose.model('Books', BooksSchema);
module.exports = Books;
