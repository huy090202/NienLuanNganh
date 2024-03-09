const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    gender: { type: String },
    city: { type: String },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: "65eac69a689883acb1f43c5a",
    },
    // isSeller: { type: Boolean, default: false, required: true },
    // isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
