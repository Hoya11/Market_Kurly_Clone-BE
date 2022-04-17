const express = require('express');
const router = express.Router();
const { newProduct, bestProduct, saleProduct  } = require('./controllers/products');


//회원가입
router.post('/signUp', newProduct);

//로그인
router.post("/login", bestProduct);

//사용자 인증
router.get("/users/me", saleProduct);



module.exports = router;