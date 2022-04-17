const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const controller = require("./controllers/carts");




// 장바구니 추가
router.post("/:cart", authMiddleware);

// 장바구니 조회
router.get("/cart/:productbestId", authMiddleware);

// 장바구니 삭제
router.delete("/cart/delete", authMiddleware);



module.exports = router;