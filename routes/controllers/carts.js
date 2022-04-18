const { Cart, productDetail } = require('../../models');
// const jwt = require("jsonwebtoken");
// const authMiddleware = require("../../middleswares/auth-middleware")
// const { Op } = require("sequelize");


//장바구니 조회
// const getCart = async (req, res) => {
//     const { userId } = res.locals;
//     const cart = await Cart.findAll({ where: { userId } })
// }

const addCart = async (req, res) => {
    const userId = res.locals.user.userId;
    const { amount } = req.body;
    const { productId } = req.params;
    const thePost = await productDetail.findOne({ productId });
    const exitCart = await Cart.findOne({ userId, productId });
    const abcd = Number(exitCart.amount) + Number(amount) 
    console.log(userId, amount, productId)
    if (exitCart) {
        await Cart.update({ amount: abcd }, { where: { userId, productId } })
        await exitCart.save()
        console.log(abcd);
        return res.status(200).json({ ok: "기존에 있는거여서 추가 했슴당" });
    }

    try {
        await Cart.create({
            userId,
            productId,
            title: thePost.title,
            price: thePost.price,
            imgurl: thePost.imgurl,
            amount,
        });
        const data = {
            userId,
            productId,
            title: thePost.title,
            price: thePost.price,
            imgurl: thePost.imgurl,
            amount,
        };
        res.status(200).json({ ok: "true", data });
    } catch (error) {
        res.status(400).json({ ok: "false" });
    }
};

const getCart = async (req, res) => {
    const userId = res.locals.user.userId;
    try {
        const getCarts = await Cart.findAll({ userId });
        console.log(getCarts)
        return res.status(200).json({
            ok: "true",
            carts: getCarts,
        });
    } catch (error) {
        res.status(400).json({ ok: "false" });
    }
};



const deleteCart = async (req, res) => {
    const { cartId } = req.body;
    await Cart.destroy({ where: {cartId}})

    res.send({ msg: "댓글이 삭제되었습니다" });
}


// const deleteCart = async (req, res) => {
//     const userEmail = res.locals.user.email;
//     const { postId } = req.params;
//     try {
//         const deleteCarts = await Cart.find({ userEmail, postId });
//         if (deleteCarts.length) {
//             await Cart.deleteOne({ userEmail, postId });
//         }
//         res.status(200).json({ ok: "true", message: "삭제 성공" });
//     } catch (error) {
//         res.status(400).json({ ok: "false", message: "삭제 실패" });
//     }
// };

module.exports = {
    addCart,
    getCart,
    deleteCart,
};
