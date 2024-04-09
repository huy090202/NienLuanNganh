const Product = require("../models/ProductModel");
const Role = require("../models/RoleModel");
const Description = require("../models/descriptionModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
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
    } = newProduct;

    try {
      const checkProduct = await Product.findOne({
        nameVi: nameVi,
        nameEn: nameEn,
      });

      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "The name of product is already",
        });
        return;
      }

      const createdProduct = await Product.create({
        nameVi,
        nameEn,
        image,
        type,
        countInStock: Number(countInStock),
        priceOld,
        priceNew,
        descriptionVi,
        descriptionEn,
        discount,
        selled,
      });

      if (createdProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        data,
        {
          new: true,
        }
      );

      if (updatedProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      // Check image
      if (data.image) {
        updatedProduct.image = data.image;
      }

      resolve({
        status: "OK",
        message: "Update the product success",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      let product = await Product.findOne({
        _id: id,
      });

      resolve({
        status: "OK",
        message: "SUCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = "";
      if (productId === "All") {
        products = await Product.aggregate([
          { $sample: { size: 9999 } }, // Lấy n mẫu ngẫu nhiên từ danh sách sản phẩm
        ]);

        // products = await Product.find({});
      }

      if (productId && productId !== "All") {
        products = await Product.findOne({ _id: productId });
      }

      resolve({
        status: "OK",
        message: "Success",
        products,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProductWithCatalog = (productType) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productType) {
        resolve({
          status: "ERR",
          message: "The type is required",
        });
      } else {
        let getAllProductWithCatalog = await Product.find({
          type: productType,
        });

        if (!getAllProductWithCatalog) {
          getAllProductWithCatalog = [];

          resolve({
            status: "ERR",
            message: "The type is required",
            data: getAllProductWithCatalog,
          });
        }

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: getAllProductWithCatalog,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const typeRoleProduct = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          status: "ERR",
          message: "The roleName is required",
        });
      }

      const dataRole = await Role.find({ roleName: typeInput });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: dataRole,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getTopProductHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await Product.aggregate([
        { $sample: { size: Number(limit) } },
        // Hien thi type theo roleValueVi || roleValueEn thay vi hien thi theo roleKey
        {
          $lookup: {
            from: "roles",
            localField: "type",
            foreignField: "roleKey",
            as: "roleInfo",
          },
        },
        { $unwind: "$roleInfo" },
        {
          $project: {
            _id: 1,
            nameVi: 1,
            nameEn: 1,
            image: 1,
            type: {
              $cond: {
                if: { $eq: [{ $type: "$roleInfo.roleValueVi" }, "missing"] },
                then: "$roleInfo.roleValueEn",
                else: "$roleInfo.roleValueVi",
              },
            },
            priceOld: 1,
            priceNew: 1,
            countInStock: 1,
            descriptionVi: 1,
            descriptionEn: 1,
            discount: 1,
            selled: 1,
            createdAt: 1,
          },
        },
        { $sort: { createdAt: -1 } },
      ]);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: products,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getSuggestionProductHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await Product.aggregate([
        { $sample: { size: Number(limit) } },
        // Hien thi type theo roleValueVi || roleValueEn thay vi hien thi theo roleKey
        {
          $lookup: {
            from: "roles",
            localField: "type",
            foreignField: "roleKey",
            as: "roleInfo",
          },
        },
        { $unwind: "$roleInfo" },
        {
          $project: {
            _id: 1,
            nameVi: 1,
            nameEn: 1,
            image: 1,
            type: {
              $cond: {
                if: { $eq: [{ $type: "$roleInfo.roleValueVi" }, "missing"] },
                then: "$roleInfo.roleValueEn",
                else: "$roleInfo.roleValueVi",
              },
            },
            priceOld: 1,
            priceNew: 1,
            countInStock: 1,
            descriptionVi: 1,
            descriptionEn: 1,
            discount: 1,
            selled: 1,
            createdAt: 1,
          },
        },
      ]);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: products,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProductsDescription = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let description = await Product.find(
        { roleName: "Catalog" },
        { image: 0 }
      );

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: description,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const saveProductDescription = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.typeProductId || !data.contentHtml || !data.contentMarkdown) {
        resolve({
          status: "ERR",
          message: "Missing input data!",
        });
      }

      const checkProduct = await Description.create({
        typeProductId: data.typeProductId,
        contentHtml: data.contentHtml,
        contentMarkdown: data.contentMarkdown,
      });

      resolve({
        status: "OK",
        message: "Save infor product description success!",
        checkProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteManyProduct,
  getAllType,
  typeRoleProduct,
  getTopProductHome,
  getAllProductsDescription,
  saveProductDescription,
  getSuggestionProductHome,
  getAllProductWithCatalog,
};
