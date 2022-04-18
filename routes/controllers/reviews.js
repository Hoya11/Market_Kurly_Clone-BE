const res = require('express/lib/response');
const { Review } = require("../../models");


const createReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { title, content } = req.body;
        const { user } = res.locals;
        const userId = user.userId
        const userName = user.userName
        // console.log(userId, userName)
        const createdTime = String(new Date());//임시, 원래는 프론트에서 넘겨주어야 함
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

        res.json({ msg: "댓글이 작성되었습니다", list });

    }
    catch (error) {
        console.log(error);
        res.status(400).send({ msg: error.message })
    }
};




// router.delete("/comments/delete/:commentId", authMiddleware, async (req, res) => {
//     const { commentId } = req.params;
//     await Comment.deleteOne({ _id: commentId });
//     console.log(commentId)
//     res.send({ result: '삭제완료' });
//   })

const removeReview = async (req, res) => {
    // const { reviewsid } = req.params;
    const { reviewsid } = req.body;
    // const reviewid = 1
    const { user } = res.locals;
    console.log(req.params, user, reviewsid);
    // const deleteReview = await Review.findOne({
    //     where:{ }
    // });

    // console.log(thisReview);

    // await thisReview.destroy();

    res.send({ msg: "댓글이 삭제되었습니다" });

}

// async function httpDeleteComment(req, res) {
//     const { accomoId, commentId } = req.params;
//     const { userId } = res.locals.user;

//     try {
//       const existingComment = await Comment.findOne({
//         where: { commentId: commentId, accomoId: accomoId, userId: userId },
//       });

//       if (!existingComment) return res.status(400).send();

//       await Comment.destroy({
//         where: { commentId: commentId, accomoId: accomoId, userId: userId },
//       });

//       res.status(204).send();
//     } catch (err) {
//       console.log(err);
//     }
//   }


//댓글 삭제

module.exports = { createReview, removeReview }


