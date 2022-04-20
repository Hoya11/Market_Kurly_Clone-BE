const express = require("express");
const router = express.Router();
const middleswares = require("../middleswares/auth-middleware");

const { addCart, getCart, deleteCart, newCart, bestCart, saleCart, } = require("./controllers/carts");


// modalCart,

// 장바구니 추가
router.post("/cart/:productId", middleswares, addCart);

// 모달 신상품 장바구니 추가
router.post("/cart/new/:productnewId", middleswares, newCart);

// 모달 베스트 장바구니 추가
router.post("/cart/best/:productbestId", middleswares, bestCart);

// 모달 알뜰ㆍ쇼핑 장바구니 추가
router.post("/cart/sale/:productsaleId", middleswares, saleCart);

// 장바구니 조회
router.get("/cart", middleswares, getCart);

// 장바구니 삭제
router.delete("/cart", middleswares, deleteCart);



module.exports = router;

