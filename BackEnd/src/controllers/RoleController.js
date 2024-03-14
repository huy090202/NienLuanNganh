const RoleService = require("../services/RoleService");

const createRole = async (req, res) => {
  try {
    const { roleName, roleKey, roleValueVi, roleValueEn, roleImage } = req.body;
    if (!roleName || !roleKey || !roleValueVi || !roleValueEn) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await RoleService.createRole(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllRole = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "The id is required",
        roles: [],
      });
    }
    const response = await RoleService.getAllRole(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.body.id;
    if (!roleId) {
      return res.status(200).json({
        status: "ERR",
        message: "The roleId is required",
      });
    }
    const response = await RoleService.deleteRole(roleId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const roleId = req.body.id;
    const data = req.body;

    if (!roleId) {
      return res.status(200).json({
        status: "ERR",
        message: "The roleId is required",
      });
    }
    const response = await RoleService.updateRole(roleId, data);

    if (response.status === "OK") {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({
        status: "ERR",
        message: response.message,
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      status: "ERR",
      message: "Internal Server Error",
    });
  }
};

// Load all danh muc
const getCatalog = async (req, res) => {};

module.exports = {
  createRole,
  getAllRole,
  deleteRole,
  updateRole,
  getCatalog,
};
