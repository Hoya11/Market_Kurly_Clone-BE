const express = require("express");

const router = express.Router();
const middleswares = require('../middleswares/auth-middleware')

const { createReview, removeReview } = require('./controllers/reviews')

router.route('/review/:productId')
    .post(middleswares, createReview)// 댓글 작성
    .delete(middleswares, removeReview);// 댓글 삭제

// router.post('/review/:productId', middleswares, createReview);


module.exports = router;
