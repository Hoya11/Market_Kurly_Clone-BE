const express = require('express');
const router = express.Router();
const { signUp, login, user } = require('./controllers/users');


//회원가입
router.post('/signUp', signUp);

//로그인
router.post("/login", login);

//사용자 인증
router.get("/users/me", user);


// User.
// associate = function (models) {
//     models.User.hasMany(models.productDetail, {
//       foreignKey: 'userId',
//       sourceKey: 'userId'
//     });
//     models.User.hasMany(models.Review, {
//       foreignKey: 'userId',
//       sourceKey: 'userId'
//     })
//     models.User.hasOne(models.Cart, {
//       foreignKey: 'userId',
//       sourceKey: 'userId'
//     })
//   }

module.exports = router;