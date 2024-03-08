const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.get("/role", userController.roleUser);
router.put(
  "/update-user",
  // authUserMiddleWare,
  userController.updateUser
);
router.delete(
  "/delete-user",
  // authMiddleWare,
  userController.deleteUser
);
router.get(
  "/getAll",
  // authMiddleWare,
  userController.getAllUser
);
router.get(
  "/get-details/:id",
  authUserMiddleWare,
  userController.getDetailsUser
);
router.post("/refresh-token", userController.refreshToken);
router.post("/delete-many", authMiddleWare, userController.deleteMany);

module.exports = router;
