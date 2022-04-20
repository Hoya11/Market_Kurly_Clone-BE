const res = require('express/lib/response');
const { Review } = require("../../models");
const moment = require("moment");

//리뷰 저장
const createReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { title, content } = req.body;
        const { user } = res.locals;
        const userId = user.userId
        const userName = user.userName
        const createdTime = moment().format("YYYY-MM-DD HH:mm:ss")

        const list = await Review.create({
            productId,
            title,
            content,
            createdTime,
            userId,
            userName
        });
        console.log(list)

        res.send({ msg: "댓글이 작성되었습니다", list });

    }
    catch (error) {
        console.log(error);
        res.status(400).send({ msg: error.message })
    }
};

// 리뷰 삭제
const removeReview = async (req, res) => {
    const { reviewId } = req.body;
    const userId = res.locals.user.userId;
    await Review.destroy({ where: { reviewId, userId } })

    res.send({ msg: "댓글이 삭제되었습니다" });
}



module.exports = { createReview, removeReview }



