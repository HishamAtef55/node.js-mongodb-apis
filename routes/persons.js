const express = require("express");
const router = express.Router();

const personsController = require("../controllers/personsController");

router.get("/", personsController.index);
router.post("/create", personsController.create);
router.put("/update/:id", personsController.update);
module.exports = router;
