const { productNew, productBest, productSale } = require("../../models");
// const authMiddleware = require("../middleswares/auth-middleware")

const newProduct = async (req,res) => {
    const { page } = req.params
    const newList = await productNew.findAll({ where: {} })
    console.log();
}