const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    nameVi: { type: String, required: true, unique: true },
    nameEn: { type: String, required: true, unique: true },
    image: { type: Buffer, maxlength: 16 * 1024 * 1024, default: null },
    type: { type: String, required: true },
    priceOld: { type: Number },
    priceNew: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    descriptionVi: { type: String },
    descriptionEn: { type: String },
    discount: { type: String },
    selled: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
