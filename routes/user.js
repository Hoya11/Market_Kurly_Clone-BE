const express = require('express');
const router = express.Router();
const { signUp } = require('./controllers/users');


//회원가입
router.post('/signUp', signUp);








module.exports = router;