const express = require("express");
const router = express.Router();

const cashbacksController = require("../controllers/cashbacksController");

router.get("/", cashbacksController.getAllCashbacks);
router.get("/:id", cashbacksController.getCashbackById);
router.post("/", cashbacksController.createCashback);
router.patch("/:id", cashbacksController.updateCashback);
router.delete("/:id", cashbacksController.deleteCashback);

module.exports = router;