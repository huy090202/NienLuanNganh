const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/RoleController");

router.post("/createRole", RoleController.createRole);

router.get("/getAllRole", RoleController.getAllRole);

router.delete("/deleteRole", RoleController.deleteRole);

router.put("/updateRole", RoleController.updateRole);

module.exports = router;
