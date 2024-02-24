const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.get);
router.post("/", productController.create);
router.get("/:id", productController.show);
router.put("/:id", productController.edit);
router.delete("/:id", productController.remove);
router.post("/search", productController.search);

module.exports = router;
