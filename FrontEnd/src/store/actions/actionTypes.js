const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  // admin
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

  FETCH_ROLE_START: "FETCH_ROLE_START",
  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",

  FETCH_TYPE_ROLE_PRODUCT_START: "FETCH_TYPE_ROLE_PRODUCT_START",
  FETCH_TYPE_ROLE_PRODUCT_SUCCESS: "FETCH_TYPE_ROLE_PRODUCT_SUCCESS",
  FETCH_TYPE_ROLE_PRODUCT_FAILED: "FETCH_TYPE_ROLE_PRODUCT_FAILED",

  // user
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILED: "CREATE_USER_FAILED",

  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED: "EDIT_USER_FAILED",

  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILED: "DELETE_USER_FAILED",

  FETCH_ALL_USERS_SUCCESS: "FETCH_ALL_USERS_SUCCESS",
  FETCH_ALL_USERS_FAILED: "FETCH_ALL_USERS_FAILED",

  // product
  CREATE_PRODUCT_SUCCESS: "CREATE_PRODUCT_SUCCESS",
  CREATE_PRODUCT_FAILED: "CREATE_PRODUCT_FAILED",

  EDIT_PRODUCT_SUCCESS: "EDIT_PRODUCT_SUCCESS",
  EDIT_PRODUCT_FAILED: "EDIT_PRODUCT_FAILED",

  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_FAILED: "DELETE_PRODUCT_FAILED",

  FETCH_ALL_PRODUCTS_SUCCESS: "FETCH_ALL_PRODUCTS_SUCCESS",
  FETCH_ALL_PRODUCTS_FAILED: "FETCH_ALL_PRODUCTS_FAILED",

  FETCH_TOP_PRODUCTS_SUCCESS: "FETCH_TOP_PRODUCTS_SUCCESS",
  FETCH_TOP_PRODUCTS_FAILED: "FETCH_TOP_PRODUCTS_FAILED",

  FETCH_SUGGESTION_PRODUCTS_SUCCESS: "FETCH_SUGGESTION_PRODUCTS_SUCCESS",
  FETCH_SUGGESTION_PRODUCTS_FAILED: "FETCH_SUGGESTION_PRODUCTS_FAILED",

  FETCH_ALL_PRODUCTS_DESCRIPTION_SUCCESS:
    "FETCH_ALL_PRODUCTS_DESCRIPTION_SUCCESS",
  FETCH_ALL_PRODUCTS_DESCRIPTION_FAILED:
    "FETCH_ALL_PRODUCTS_DESCRIPTION_FAILED",

  SAVE_PRODUCT_DESCRIPTION_SUCCESS: "SAVE_PRODUCT_DESCRIPTION_SUCCESS",
  SAVE_PRODUCT_DESCRIPTION_FAILED: "SAVE_PRODUCT_DESCRIPTION_FAILED",

  FETCH_PRODUCT_WITH_CATALOG_SUCCESS: "FETCH_PRODUCT_WITH_CATALOG_SUCCESS",
  FETCH_PRODUCT_WITH_CATALOG_FAILED: "FETCH_PRODUCT_WITH_CATALOG_FAILED",

  // catalog
  CREATE_CATALOG_SUCCESS: "CREATE_CATALOG_SUCCESS",
  CREATE_CATALOG_FAILED: "CREATE_CATALOG_FAILED",

  EDIT_CATALOG_SUCCESS: "EDIT_CATALOG_SUCCESS",
  EDIT_CATALOG_FAILED: "EDIT_CATALOG_FAILED",

  DELETE_CATALOG_SUCCESS: "DELETE_CATALOG_SUCCESS",
  DELETE_CATALOG_FAILED: "DELETE_CATALOG_FAILED",

  FETCH_ALL_CATALOGS_SUCCESS: "FETCH_ALL_CATALOGS_SUCCESS",
  FETCH_ALL_CATALOGS_FAILED: "FETCH_ALL_CATALOGS_FAILED",
});

export default actionTypes;
