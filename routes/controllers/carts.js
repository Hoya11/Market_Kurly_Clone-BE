const { Cart, productDetail } = require('../../models');


//상세 페이지에서 장바구니 담기
const addCart = async (req, res) => {
    const userId = res.locals.user.userId;
    const { amount } = req.body;
    const { productId } = req.params;
    const thePost = await productDetail.findOne({where: { productId }});
    const exitCart = await Cart.findOne({where: { userId, productId }});
    
    if (exitCart) {
        const cartAmount = Number(amount) + Number(exitCart.amount)
        await Cart.update({ amount: +cartAmount }, { where: { userId, productId } })
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

// 장바구니 조회
const getCart = async (req, res) => {
    const userId = res.locals.user.userId;
    try {
        const getCarts = await Cart.findAll({where:{ userId }});
        
        return res.status(200).json({
            ok: "true",
            carts: getCarts,
        });
    } catch (error) {
        res.status(400).json({ ok: "false" });
    }
};


const deleteCart = async (req, res) => {
    const userId = res.locals.user.userId;
    const { cartId } = req.body;
    try {
        await Cart.destroy({ where: { userId, cartId } })
        return res.status(200).send({
            result: 'success',
            msg: '장바구니에서 삭제',
        });

    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    addCart,
    getCart,
    deleteCart,
};


