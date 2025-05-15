
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    type: { type: String }, // physical or digital
    downloadUrl: { type: String, required: function() { return this.type === 'digital'; } },
});

module.exports = mongoose.model('Product', productSchema);
