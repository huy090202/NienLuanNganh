const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    roleName: { type: String },
    roleKey: { type: String, unique: true },
    roleValueEn: { type: String, unique: true },
    roleValueVi: { type: String, unique: true },
  },
  {
    // timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
