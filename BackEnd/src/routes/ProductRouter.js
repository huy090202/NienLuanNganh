const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", ProductController.createProduct);

router.put(
  "/update-product",
  // authMiddleWare,
  ProductController.updateProduct
);

router.get("/get-details", ProductController.getDetailsProduct);

router.delete(
  "/delete-product",
  // authMiddleWare,
  ProductController.deleteProduct
);

router.get("/get-all", ProductController.getAllProduct);

router.get("/getTopProductHome", ProductController.getTopProductHome);

router.get(
  "/getSuggestionProductHome",
  ProductController.getSuggestionProductHome
);

router.get(
  "/getAllProductsDescription",
  ProductController.getAllProductsDescription
);

router.post(
  "/saveProductDescription",
  ProductController.saveProductDescription
);

router.post("/delete-many", authMiddleWare, ProductController.deleteMany);

router.get("/get-all-type", ProductController.getAllType);

router.get("/roleType", ProductController.typeRoleProduct);

module.exports = router;
