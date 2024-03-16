import axios from "../axios";

const getAllProducts = (inputId) => {
  return axios.get(`/api/product/get-all?id=${inputId}`);
};

const createNewProductService = (data) => {
  return axios.post("/api/product/create", data);
};

const deleteProductService = (productId) => {
  return axios.delete("/api/product/delete-product", {
    data: { id: productId },
  });
};

const editProductService = (data) => {
  return axios.put("/api/product/update-product", data);
};

const getRoleProductService = (inputRoleName) => {
  return axios.get(`/api/product/roleType?roleName=${inputRoleName}`);
};

const getTopProductsHomeService = (limit) => {
  return axios.get(`/api/product/getTopProductHome?limit=${limit}`);
};

const getAllProductsDescription = () => {
  return axios.get("/api/product/getAllProductsDescription");
};

const saveProductDescription = (data) => {
  return axios.post("/api/product/saveProductDescription", data);
};

export {
  getAllProducts,
  createNewProductService,
  deleteProductService,
  editProductService,
  getRoleProductService,
  getTopProductsHomeService,
  getAllProductsDescription,
  saveProductDescription,
};
