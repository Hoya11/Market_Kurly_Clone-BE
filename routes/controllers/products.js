const { productNew, productBest, productSale, productDetail, Review } = require("../../models");

// 신상품 조회
const newProduct = async (req, res) => {
    const newList = await productNew.findAll({ where: {} })
    res.json({ newList })
}

// 베스트 조회
const bestProduct = async (req, res) => {
    const bestList = await productBest.findAll({ where: {} })
    res.json({ bestList })
}

// 알뜰쇼핑 조회
const saleProduct = async (req, res) => {
    const saleList = await productSale.findAll({ where: {} })
    res.json({ saleList })
}

//상세페이지 조회
const getDetail = async (req, res) => {
    const { productId } = req.params;
    const Detailpage = await productDetail.findAll({where: {productId}})
    const reviewList = await Review.findAll({ where: { productId } })
    //.sort({createdTime: -1});
    res.json({ Detailpage, reviewList })
}


module.exports = { newProduct, bestProduct, saleProduct, getDetail }