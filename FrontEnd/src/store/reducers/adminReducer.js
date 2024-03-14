import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  isLoadingGender: false,
  roles: [],
  users: [],
  products: [],
  typeRoleProducts: [],
  isLoadingRoleProduct: false,
  catalogs: [],
  topProducts: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // Gender
    case actionTypes.FETCH_GENDER_START:
      let copyStateGender = { ...state };
      copyStateGender.isLoadingGender = true;
      return {
        ...copyStateGender,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    // Role
    case actionTypes.FETCH_ROLE_START:
      let copyStateRole = { ...state };
      return {
        ...copyStateRole,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    // Type role product
    case actionTypes.FETCH_TYPE_ROLE_PRODUCT_START:
      let copyStateRoleProduct = { ...state };
      copyStateRoleProduct.isLoadingRoleProduct = true;
      return {
        ...copyStateRoleProduct,
      };

    case actionTypes.FETCH_TYPE_ROLE_PRODUCT_SUCCESS:
      state.typeRoleProducts = action.data;
      state.isLoadingRoleProduct = false;
      return {
        ...state,
      };

    case actionTypes.FETCH_TYPE_ROLE_PRODUCT_FAILED:
      state.isLoadingRoleProduct = false;
      state.typeRoleProducts = [];
      return {
        ...state,
      };

    // Read all users
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };

    // Read all products
    case actionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
      state.products = action.dataProducts;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_PRODUCTS_FAILED:
      state.products = [];
      return {
        ...state,
      };

    // Read all catalogs
    case actionTypes.FETCH_ALL_CATALOGS_SUCCESS:
      state.catalogs = action.dataCatalogs;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_CATALOGS_FAILED:
      state.catalogs = [];
      return {
        ...state,
      };

    // Fetch top products
    case actionTypes.FETCH_TOP_PRODUCTS_SUCCESS:
      state.topProducts = action.dataTopProducts;
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_PRODUCTS_FAILED:
      state.topProducts = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
