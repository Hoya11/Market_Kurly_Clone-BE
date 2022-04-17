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




// router.delete("/comments/delete/:commentId", authMiddleware, async (req, res) => {
//     const { commentId } = req.params;
//     await Comment.deleteOne({ _id: commentId });
//     console.log(commentId)
//     res.send({ result: '삭제완료' });
//   })

const removeReview = async (req, res) => {
    const { productId } = req.params;
    const { reviewsid } = req.body;
    const { userId } = res.locals;
    const thisReview = await Review.findByPk(reviewsid);  //findByPk 절대안됨 왜안되는지도 모름 개억울함 , fingOne 이것도 안됨 ㅡㅡ  
    console.log(req.params);
    console.log(req.body);
    console.log(res.locals);
    console.log(thisReview);

    //(저 진짜 리뷰작성코드 오류잡는데 새벽 날렸습니다.. 혼이 담긴 코드에요) //증인:윤하님,석일님,영수님 
    //(윤하님이 계속 방해했는데 열심히 코드 만들었습니다)
    //(경은님과 진우님한테 뒤를 맡기겠습니다.. 전 안되나봐요 밑에가 sql로 리뷰삭제하는 코드고 위에가 몽고로 댓글 삭제했던 코드입니다)
    //(내일 오전에 없으면 죽은줄아세요)


    // await thisReview.destroy();

    res.send({ msg: "댓글이 삭제되었습니다" });

}

// const removeReview = async (req, res) => {
//     try {
//         const { productId } = req.params
//         const { reviewid } = req.body;
//         const { userId } = res.locals;
//         console.log(req.params);
//         console.log(req.body);
//         console.log(res.locals);

//         const thisReview = await Review.findByPk(reviewid);

//         if (thisReview.productId !== Number(productId) || thisReview.user_id !== Number(user_id)) {// 이것도 넘겨줄때 integer로 넘겨주거나 number처리 안하면 오류남
//             throw Error("서버 검증 오류");
//         }
//         await thisReview.destroy();

//         res.send({ msg: "댓글이 삭제되었습니다" });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(400).send({ msg: error.message });
//     }
// };


//댓글 삭제

module.exports = { createReview, removeReview }



