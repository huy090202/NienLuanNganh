const Role = require("../models/RoleModel");

const createRole = (newRole) => {
  return new Promise(async (resolve, reject) => {
    const { roleName, roleKey, roleValueVi, roleValueEn, roleImage } = newRole;

    try {
      const checkRole = await Role.findOne({
        roleKey: roleKey,
      });

      if (checkRole !== null) {
        resolve({
          status: "ERR",
          message: "The name of role is already",
        });
      }

      const newRole = await Role.create({
        roleName,
        roleKey,
        roleValueVi,
        roleValueEn,
        roleImage,
      });

      if (newRole) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newRole,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllRole = (roleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let roles = "";
      if (roleId === "Catalog") {
        roles = await Role.find({ roleName: roleId });
      }
      if (roleId && roleId !== "Catalog") {
        roles = await Role.findOne({ _id: roleId });
      }

      resolve({
        status: "OK",
        message: "Success",
        roles,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteRole = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkRole = await Role.findOne({
        _id: id,
      });

      if (checkRole === null) {
        resolve({
          status: "ERR",
          message: "The role is not defined",
        });
      }

      await Role.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete role success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateRole = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkRole = await Role.findOne({
        _id: id,
      });

      if (checkRole === null) {
        resolve({
          status: "ERR",
          message: "The role is not defined",
        });
      }

      const updatedRole = await Role.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (data.roleImage) {
        updatedRole.roleImage = data.roleImage;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedRole,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createRole,
  getAllRole,
  deleteRole,
  updateRole,
};
