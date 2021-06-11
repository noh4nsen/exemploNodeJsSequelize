const express = require("express");
const sellerRouter = require("./sellerRouter");
const saleRouter = require("./saleRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Funcionando");
});

router.use("/seller", sellerRouter);
router.use("/sale", saleRouter);

module.exports = router;