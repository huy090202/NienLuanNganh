const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    roleName: { type: String }, // ROLE
    roleKey: { type: String, unique: true }, // R1, R2, R3
    roleValueEn: { type: String, unique: true }, // Customer, Seller, Admin
    roleValueVi: { type: String, unique: true }, // Khách hàng, Người bán, Quản trị viên
  },
  {
    // timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;