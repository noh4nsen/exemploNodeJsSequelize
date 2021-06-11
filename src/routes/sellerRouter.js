const express = require("express");
const sellerRouter = express.Router();
const sellerController = require("../controllers/sellerController");

sellerRouter.get("/listAllSellers", sellerController.listAllSellers);
sellerRouter.post("/searchSellerByName", sellerController.searchSellerByName);
sellerRouter.post("/newSeller", sellerController.newSeller);
sellerRouter.delete("/deleteSeller/:id", sellerController.deleteSeller);
sellerRouter.put("/updateSeller/", sellerController.updateSeller);

module.exports = sellerRouter;