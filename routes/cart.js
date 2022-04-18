const express = require("express");
const router = express.Router();
const middleswares = require("../middleswares/auth-middleware");

const { addCart, getCart } = require("./controllers/carts");




// 장바구니 추가
router.post("/cart/:productId", middleswares, addCart);

// 장바구니 조회
router.get("/cart/:productId", middleswares, getCart);

// 장바구니 삭제
router.delete("/cart", middleswares);



module.exports = router;