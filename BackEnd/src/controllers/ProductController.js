const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const {
      nameVi,
      nameEn,
      image,
      type,
      countInStock,
      priceOld,
      priceNew,
      descriptionVi,
      descriptionEn,
      discount,
      selled,
    } = req.body;

    if (!nameVi || !nameEn || !image || !type || !countInStock || !priceNew) {
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

const updateCountInStock = async (req, res) => {
  try {
    const productId = req.body.id; // Sửa thành req.body.productId để lấy productId từ body request
    const countInStock = req.body.countInStock;
    if (!productId || !countInStock) {
      return res.status(400).json({
        status: "ERR",
        message: "The productId and countInStock are required", // Sửa thành "productId" và "countInStock"
      });
    }
    const response = await ProductService.updateCountInStock(productId, countInStock);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ // Sửa thành status 500 để báo lỗi nếu có lỗi xảy ra trong quá trình xử lý
      message: e.message, // Sửa thành e.message để lấy thông báo lỗi cụ thể
    });
  }
}


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
    const productId = req.query.id;
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
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const productSearch = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "The id is required",
        products: [],
      });
    }
    const response = await ProductService.productSearch(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProductWithCatalog = async (req, res) => {
  try {
    const typeProduct = req.query.type;
    if (!typeProduct) {
      return res.status(200).json({
        status: "ERR",
        message: "The type is required",
        getAllProductWithCatalog: [],
      });
    }
    const response = await ProductService.getAllProductWithCatalog(typeProduct);
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

const getSuggestionProductHome = async (req, res) => {
  try {
    let limit = req.query.limit || 12;
    let response = await ProductService.getSuggestionProductHome(+limit);
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
  getSuggestionProductHome,
  getAllProductWithCatalog,
  updateCountInStock,
  productSearch
};
