const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'product name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'product price must be required']
  },
  imageUrl: {
    // required: [true, 'product image must be required'],
    type: String,
  },
  company: {
    type: String,
    required: [true,'product company name must be provided'],
  },
  rating: {
    type: Number,
    default: 4.5
  },
  createAT: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Product',productSchema)