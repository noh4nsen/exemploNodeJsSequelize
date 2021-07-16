const express = require("express");
const saleRouter = express.Router();
const saleController = require("../controllers/saleController");
const auth = require("../middlewares/auth");

saleRouter.get("/listAllSales", auth, saleController.listAllSales);
saleRouter.post("/searchSalesByDate", auth, saleController.searchSalesByDate);
saleRouter.get(
	"/searchSalesBySeller/:sellerId",
	auth,
	saleController.searchSalesBySeller
);

module.exports = saleRouter;