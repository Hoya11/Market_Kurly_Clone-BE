const jwt = require("jsonwebtoken");
const { User } = require("../models");


module.exports = (req, res, next) => {
    console.log('지나감')
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ')
    console.log(tokenType)
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.'
        });
        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, "m-s-k-j-w");

        User.findByPk(userId).then((user) => {
            res.locals.user = user;
            next();
        });

    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.'
        });
        return;
    }
};