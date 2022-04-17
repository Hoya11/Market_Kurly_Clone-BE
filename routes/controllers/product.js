// const { Op } = require('sequelize')
// const { Product } = require("../../models/product");


// async function GetNewList(req, res) {
//     try {
//         const productId = req.parms.productId;
//         console.log(productId)
//         const productList = await product.FindAll({ where: { productId } })
//         res.status(200).json({ productList: productList })
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({
//             errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
//         });
//     }
// }


// module.exports = {
//     GetNewList
// };