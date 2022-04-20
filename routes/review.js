const express = require("express");

const router = express.Router();
const middleswares = require('../middleswares/auth-middleware')

const { createReview, removeReview } = require('./controllers/reviews')

router.route('/review/:productId')
    // 댓글 작성
    .post(middleswares, createReview)
    // 댓글 삭제
    .delete(middleswares, removeReview);



module.exports = router;
