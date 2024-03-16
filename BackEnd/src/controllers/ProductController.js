const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      countInStock,
      price,
      description,
      discount,
      selled,
    } = req.body;
    if (!name || !image || !type || !countInStock || !price) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    const data = req.body;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.updateProduct(productId, data);

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

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await ProductService.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "The id is required",
        products: [],
      });
    }
    const response = await ProductService.getAllProduct(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const typeRoleProduct = async (req, res) => {
  try {
    const data = await ProductService.typeRoleProduct(req.query.roleName);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      status: "ERR",
      message: "Error from server",
    });
  }
};

const getTopProductHome = async (req, res) => {
  try {
    let limit = req.query.limit || 12;
    let response = await ProductService.getTopProductHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERR",
      message: "Error from server...",
    });
  }
};

const getAllProductsDescription = async (req, res) => {
  try {
    let description = await ProductService.getAllProductsDescription();
    return res.status(200).json(description);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERR",
      message: "Error from the server...",
    });
  }
};

const saveProductDescription = async (req, res) => {
  try {
    let data = req.body;
    let response = await ProductService.saveProductDescription(data);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERR",
      message: "Error from the server...",
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteMany,
  getAllType,
  typeRoleProduct,
  getTopProductHome,
  getAllProductsDescription,
  saveProductDescription,
};
