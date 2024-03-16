const mongoose = require("mongoose");
const descriptionSchema = new mongoose.Schema(
  {
    contentHtml: { type: String, required: true },
    contentMarkdown: { type: String, required: true },
    typeProductId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // type of product
  },
  {
    timestamps: true,
  }
);

const Description = mongoose.model("Description", descriptionSchema);
module.exports = Description;
