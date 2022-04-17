const res = require('express/lib/response');
const { Review } = require("../../models");


const createReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { title, content } = req.body;
        const { user } = res.locals;
        const userId = user.userId
        const userName = user.userName
        console.log(userId, userName)
        const createdTime = String(new Date());//임시, 원래는 프론트에서 넘겨주어야 함
        console.log(createdTime)

        await Review.create({
            productId,
            title,
            content,
            createdTime,
            userId,
            userName
        });


        res.send({ msg: "댓글이 작성되었습니다" });

    }
    catch (error) {
        console.log(error);
        res.status(400).send({ msg: error.message })
    }
};

//댓글 삭제
const removeReview = async (req, res) => {
    try {
        const { productId } = req.params
        const { reviewid } = req.body;
        const { userId } = res.locals;
        console.log(req.params);
        console.log(req.body);
        console.log(res.locals);


        const thisReview = await Review.findByPk(reviewid);

        if (thisReview.productId !== Number(productId) || thisReview.user_id !== Number(user_id)) {// 이것도 넘겨줄때 integer로 넘겨주거나 number처리 안하면 오류남
            throw Error("서버 검증 오류");
        }
        await thisReview.destroy();

        res.send({ msg: "댓글이 삭제되었습니다" });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ msg: error.message });
    }
};

module.exports = { createReview, removeReview }



