<<<<<<< HEAD
const { productNew, productBest, productSale, productDetail, Review } = require("../../models");
=======
const { productNew, productBest, productSale, productDetail, reviews } = require("../../models");

>>>>>>> origin/abcd
// const authMiddleware = require("../middleswares/auth-middleware")

const newProduct = async (req, res) => {
    const newList = await productNew.findAll({ where: {} })
    console.log(newList);
    res.json({ newList })
}

const bestProduct = async (req, res) => {
    const bestList = await productBest.findAll({ where: {} })
    console.log(bestList);
    res.json({ bestList })
}

const saleProduct = async (req, res) => {
    const saleList = await productSale.findAll({ where: {} })
    console.log(saleList);
    res.json({ saleList })
}

const getDetail = async (req, res) => {
    const { productId } = req.params
    const Detailpage = await productDetail.findAll({})
<<<<<<< HEAD
    const reviewList = await Review.findAll({ where: {productId} })
=======
    const reviewList = await reviews.findAll({})
    // console.log(productId, Detailpage)
>>>>>>> origin/abcd
    res.json({ Detailpage, reviewList })
}


module.exports = { newProduct, bestProduct, saleProduct, getDetail }
