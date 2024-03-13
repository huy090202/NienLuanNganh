import actionTypes from "./actionTypes";
import {
  getRoleService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
} from "../../services/userService";

import {
  getAllProducts,
  createNewProductService,
  deleteProductService,
  editProductService,
  getRoleProductService,
} from "../../services/productService";

import {
  getAllCatalogs,
  createNewCatalogService,
  deleteCatalogService,
  editCatalogService,
} from "../../services/catalogService";
import { toast } from "react-toastify";

// Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });

      let res = await getRoleService("Gender");
      if (res && res.status === "OK") {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error: ", error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_ROLE_START,
      });

      let res = await getRoleService("Role");
      if (res && res.status === "OK") {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error: ", error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// Type role product
export const fetchTypeRoleProductStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_TYPE_ROLE_PRODUCT_START,
      });

      let res = await getRoleProductService("Catalog");
      if (res && res.status === "OK") {
        dispatch(fetchTypeRoleProductSuccess(res.data));
      } else {
        dispatch(fetchTypeRoleProductFailed());
      }
    } catch (error) {
      dispatch(fetchTypeRoleProductFailed());
      console.log("fetchTypeRoleProductStart error: ", error);
    }
  };
};

export const fetchTypeRoleProductSuccess = (roleProductData) => ({
  type: actionTypes.FETCH_TYPE_ROLE_PRODUCT_SUCCESS,
  data: roleProductData,
});

export const fetchTypeRoleProductFailed = () => ({
  type: actionTypes.FETCH_TYPE_ROLE_PRODUCT_FAILED,
});

// Create a new user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.status === "OK") {
        toast.success("Create a new user success!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Create a new user error!");
        dispatch(saveUserFailed());
      }
    } catch (error) {
      toast.error("Create a new user error!");
      dispatch(saveUserFailed());
      console.log("saveUserFailed error: ", error);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

// Read all users
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      if (res && res.status === "OK") {
        dispatch(fetchAllUsersSuccess(res.users));
      } else {
        toast.error("Fetch all users error!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      toast.error("Fetch all users error!");
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersFailed error: ", error);
    }
  };
};

export const fetchAllUsersSuccess = (userData) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  data: userData,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

// Delete a user
export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.status === "OK") {
        toast.success("Delete the user success!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete the user error!");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.error("Delete the user error!");
      dispatch(deleteUserFailed());
      console.log("deleteUserFailed error: ", error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

// Edit a user
export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.status === "OK") {
        toast.success("Update the user success!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update the user error!");
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("Update the user error!");
      dispatch(editUserFailed());
      console.log("editAUser error: ", error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

// Create a new product
export const createNewProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewProductService(data);
      if (res && res.status === "OK") {
        toast.success("Create a new Product success!");
        dispatch(saveProductSuccess());
        dispatch(fetchAllProductsStart());
      } else {
        toast.error("Create a new Product error!");
        dispatch(saveProductFailed());
      }
    } catch (error) {
      toast.error("Create a new Product error!");
      dispatch(saveProductFailed());
      console.log("saveProductFailed error: ", error);
    }
  };
};

export const saveProductSuccess = () => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
});

export const saveProductFailed = () => ({
  type: actionTypes.CREATE_PRODUCT_FAILED,
});

// Read all product
export const fetchAllProductsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllProducts("All");
      if (res && res.status === "OK") {
        dispatch(fetchAllProductsSuccess(res.products));
      } else {
        toast.error("Fetch all Products error!");
        dispatch(fetchAllProductsFailed());
      }
    } catch (error) {
      toast.error("Fetch all Products error!");
      dispatch(fetchAllProductsFailed());
      console.log("fetchAllProductsFailed error: ", error);
    }
  };
};

export const fetchAllProductsSuccess = (productData) => ({
  type: actionTypes.FETCH_ALL_PRODUCTS_SUCCESS,
  dataProducts: productData,
});

export const fetchAllProductsFailed = () => ({
  type: actionTypes.FETCH_ALL_PRODUCTS_FAILED,
});

// Delete a product
export const deleteAProduct = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteProductService(userId);
      if (res && res.status === "OK") {
        toast.success("Delete the Product success!");
        dispatch(deleteProductSuccess());
        dispatch(fetchAllProductsStart());
      } else {
        toast.error("Delete the Product error!");
        dispatch(deleteProductFailed());
      }
    } catch (error) {
      toast.error("Delete the Product error!");
      dispatch(deleteProductFailed());
      console.log("deleteProductFailed error: ", error);
    }
  };
};

export const deleteProductSuccess = () => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailed = () => ({
  type: actionTypes.DELETE_PRODUCT_FAILED,
});

// Edit a product
export const editAProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editProductService(data);
      if (res && res.status === "OK") {
        toast.success("Update the Product success!");
        dispatch(editProductSuccess());
        dispatch(fetchAllProductsStart());
      } else {
        toast.error("Update the Product error!");
        dispatch(editProductFailed());
      }
    } catch (error) {
      toast.error("Update the Product error!");
      dispatch(editProductFailed());
      console.log("editProductFailed error: ", error);
    }
  };
};

export const editProductSuccess = () => ({
  type: actionTypes.EDIT_PRODUCT_SUCCESS,
});

export const editProductFailed = () => ({
  type: actionTypes.EDIT_PRODUCT_FAILED,
});

// Create a new catalog
export const createNewCatalog = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewCatalogService(data);
      if (res && res.status === "OK") {
        toast.success("Create a new catalog success!");
        dispatch(saveCatalogSuccess());
        dispatch(fetchAllCatalogsStart());
      } else {
        toast.error("Create a new catalog error!");
        dispatch(saveCatalogFailed());
      }
    } catch (error) {
      toast.error("Create a new catalog error!");
      dispatch(saveCatalogFailed());
      console.log("saveCatalogFailed error: ", error);
    }
  };
};

export const saveCatalogSuccess = () => ({
  type: actionTypes.CREATE_CATALOG_SUCCESS,
});

export const saveCatalogFailed = () => ({
  type: actionTypes.CREATE_CATALOG_FAILED,
});

// Read all catalog
export const fetchAllCatalogsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCatalogs("Catalog");
      if (res && res.status === "OK") {
        dispatch(fetchAllCatalogsSuccess(res.roles));
      } else {
        toast.error("Fetch all catalogs error!");
        dispatch(fetchAllCatalogsFailed());
      }
    } catch (error) {
      toast.error("Fetch all catalogs error!");
      dispatch(fetchAllCatalogsFailed());
      console.log("fetchAllCatalogsFailed error: ", error);
    }
  };
};

export const fetchAllCatalogsSuccess = (catalogData) => ({
  type: actionTypes.FETCH_ALL_CATALOGS_SUCCESS,
  dataCatalogs: catalogData,
});

export const fetchAllCatalogsFailed = () => ({
  type: actionTypes.FETCH_ALL_CATALOGS_FAILED,
});

// Delete a catalog
export const deleteACatalog = (catalogId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteCatalogService(catalogId);
      if (res && res.status === "OK") {
        toast.success("Delete the catalog success!");
        dispatch(deleteCatalogSuccess());
        dispatch(fetchAllCatalogsStart());
      } else {
        toast.error("Delete the catalog error!");
        dispatch(deleteCatalogFailed());
      }
    } catch (error) {
      toast.error("Delete the catalog error!");
      dispatch(deleteCatalogFailed());
      console.log("deleteCatalogFailed error: ", error);
    }
  };
};

export const deleteCatalogSuccess = () => ({
  type: actionTypes.DELETE_CATALOG_SUCCESS,
});

export const deleteCatalogFailed = () => ({
  type: actionTypes.DELETE_CATALOG_FAILED,
});

// Edit a catalog
export const editACatalog = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editCatalogService(data);
      if (res && res.status === "OK") {
        toast.success("Update the catalog success!");
        dispatch(editCatalogSuccess());
        dispatch(fetchAllCatalogsStart());
      } else {
        toast.error("Update the catalog error!");
        dispatch(editCatalogFailed());
      }
    } catch (error) {
      toast.error("Update the catalog error!");
      dispatch(editCatalogFailed());
      console.log("editCatalogFailed error: ", error);
    }
  };
};

export const editCatalogSuccess = () => ({
  type: actionTypes.EDIT_CATALOG_SUCCESS,
});

export const editCatalogFailed = () => ({
  type: actionTypes.EDIT_CATALOG_FAILED,
});
