const express = require('express');
const router = express.Router();
const { newProduct, bestProduct, saleProduct } = require('./controllers/products');


//신상품
router.get('/product/new', newProduct);

//베스트
router.get("/product/best", bestProduct);

//알뜰쇼핑
router.get("/product/sale", saleProduct);



module.exports = router;