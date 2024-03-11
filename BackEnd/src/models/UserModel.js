const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: Buffer, maxlength: 16 * 1024 * 1024, default: null },
    gender: { type: String },
    city: { type: String },
    roleId: { type: String },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
