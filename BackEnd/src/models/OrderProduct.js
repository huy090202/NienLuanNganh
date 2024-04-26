const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    statusOrder: {
      type: String,
      enum: ["-1", "0", "1"],
      default: "0"
    },

    paymentMethod: {
      type: String,
      default: "Thanh toán khi nhận hàng",
      enum: ["Thanh toán khi nhận hàng", "Thanh toán qua thẻ"]
    },

    dayCreated: {
      type: Date,
    },

    shippingPrice: {
      type: Number,
      default: 20000
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', function (next) {
  // Kiểm tra nếu dayCreated chưa được thiết lập (null hoặc undefined)
  if (!this.dayCreated) {
    // Thiết lập dayCreated thành ngày hiện tại
    this.dayCreated = new Date();
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
