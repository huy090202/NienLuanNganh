import axios from "../axios";

const getAllCatalogs = (inputId) => {
  return axios.get(`/api/role/getAllRole?id=${inputId}`);
};

const createNewCatalogService = (data) => {
  return axios.post("/api/role/createRole", data);
};

const deleteCatalogService = (catalogId) => {
  return axios.delete("/api/role/deleteRole", {
    data: { id: catalogId },
  });
};

const editCatalogService = (data) => {
  return axios.put("/api/role/updateRole", data);
};

export {
  getAllCatalogs,
  createNewCatalogService,
  deleteCatalogService,
  editCatalogService,
};
