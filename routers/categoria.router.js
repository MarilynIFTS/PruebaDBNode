const express = require("express");
const router = express.Router();

const controller = require("../controllers/categoria.controller");

router.get("/", controller.allCategories);
router.get("/:IDCategoria", controller.showCatagory);
router.post("/", controller.storeCatagory);
router.put("/:IDCategoria", controller.updateCatagory);
router.delete("/:IDCategoria", controller.destroyCatagory);

module.exports = router;