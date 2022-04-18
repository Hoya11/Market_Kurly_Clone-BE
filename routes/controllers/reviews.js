const { Review } = require("../../models");
const moment = require("moment");

const createReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { title, content } = req.body;
        const { user } = res.locals;
        const userId = user.userId
        const userName = user.userName
        // console.log(userId, userName)
        const createdTime = moment().format("YYYY-MM-DD HH:mm:ss")
        // console.log(createdTime)

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

const getReview = async (req, res) => {
    const { productId } = req.params
    const reviewList = await Review.findAll({ where: {productId} })
    console.log(reviewList);
    res.json({ reviewList })
}



const removeReview = async (req, res) => {
    const { reviewId } = req.body;
    await Review.destroy({ where: {reviewId}})

    res.send({ msg: "댓글이 삭제되었습니다" });
}



// const removeReview =  async deleteProduct(id) {

//     if (!id) {
//         return {msg: 'No Id specified..', payload: 1};
//     }

//     try {
//         return !!await products.destroy({
//             where: {
//                 id: id
//             }
//         });
//     } catch (e) {
//         return false;
//     }

// }

//댓글 삭제

module.exports = { createReview, getReview, removeReview }



