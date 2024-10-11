const express = require("express");
const router = express.Router();

const controller = require("../controllers/plato.controller");

router.get("/", controller.allDishes);
router.get("/:IDPlato", controller.showDish);
router.post("/", controller.storeDish);
router.put("/:IDPlato", controller.updateDish);
router.delete("/:IDPlato", controller.destroyDish);

module.exports = router;