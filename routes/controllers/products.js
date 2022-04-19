const { productNew, productBest, productSale, productDetail, Review, Cart } = require("../../models");


const newProduct = async (req, res) => {
    const newList = await productNew.findAll({ where: {} })
    res.json({ newList })
}


const bestProduct = async (req, res) => {
    const bestList = await productBest.findAll({ where: {} })
    res.json({ bestList })
}

const saleProduct = async (req, res) => {
    const saleList = await productSale.findAll({ where: {} })
    res.json({ saleList })
}

const getDetail = async (req, res) => {
    const { productId } = req.params;
    const Detailpage = await productDetail.findAll({where: {productId}})
    const reviewList = await Review.findAll({ where: { productId } }).sort({createdTime: -1});
    res.json({ Detailpage, reviewList })
}


module.exports = { newProduct, bestProduct, saleProduct, getDetail }