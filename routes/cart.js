const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const {addCart} = require("./controllers/carts");




// 장바구니 추가
router.post("/cart", authMiddleware, addCart);

// 장바구니 조회
router.get("/cart/:productbestId", authMiddleware);

// 장바구니 삭제
router.delete("/cart", authMiddleware);



module.exports = router;