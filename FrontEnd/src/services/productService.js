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

const getSuggestionProductHomeService = (limit) => {
  return axios.get(`/api/product/getSuggestionProductHome?limit=${limit}`);
};

const getAllProductsDescription = () => {
  return axios.get("/api/product/getAllProductsDescription");
};

const saveProductDescription = (data) => {
  return axios.post("/api/product/saveProductDescription", data);
};

const getDetailsProduct = (id) => {
  return axios.get(`/api/product/get-details?id=${id}`);
};

const getAllProductWithCatalog = (typeInput) => {
  return axios.get(
    `/api/product/get-all-product-with-catalog?type=${typeInput}`
  );
};

const createOrder = (data) => {
  return axios.post("/api/order/create", data);
};

const updateCountInStock = (data) => {
  return axios.patch("/api/product/update-countInStock", data);
}

const productSearch = (data) => {
  return axios.get(`/api/product/searchProduct?id=${data}`);
}

const getAllOrder = () => {
  return axios.get("/api/order/get-all-order");
}

export {
  getAllProducts,
  createNewProductService,
  deleteProductService,
  editProductService,
  getRoleProductService,
  getTopProductsHomeService,
  getAllProductsDescription,
  saveProductDescription,
  getDetailsProduct,
  getSuggestionProductHomeService,
  getAllProductWithCatalog,
  createOrder,
  updateCountInStock,
  productSearch,
  getAllOrder
};
