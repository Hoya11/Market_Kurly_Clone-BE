
const express = require("express");
const { User } = require("../../models");
const router = express.Router();
const jwt = require('jsonwebtoken')
// const authMiddleware = require("../middleswares/auth-middleware")

router.get("/", (req, res) => {
    console.log("미들웨어가 작동합니다.")
    res.send('list page')
});


//회원가입
const signUp = async (req, res) => {
    const { userId, password, passwordCheck, userName, address } = req.body;//body에 작성한 값을 가져와
    if (password !== passwordCheck) {//패스워드와 패스워드 확인란과 같지 않을 때 에러메세지를 띄워라
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.'
        });
        return; //값이 같다면 리턴
    }

    const existUsers = await User.findAll({
        where: { userId }
    });
    if (existUsers.length) {
        res.status(400).send({//에러 메세지를 띄워준다.
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.'
        });
        return;
    }
    await User.create({ userId, password, userName, address });

    res.status(201).send({})
}


//로그인
router.post("/login", async (req, res) => {
    const { userId, password } = req.body; 
    console.log(userId,password)
    const user = await User.findOne({ where: { userId, password }});

    if(!user) {
        res.status(400).send({
            errorMessage: '닉네임 또는 패스워드를 확인해주세요.'
        })
        return;
    }
    const token = jwt.sign({ userId: user.uniqueUserid }, "m-s-k-j-w");
    res.send({
        token,
    })
});


router.get("/users/me", async (req, res) => {
    // console.log(res.locals)
    const { user } = res.locals;//변수user에 res.locals를 할당해준다
    // console.log(locals)
    res.send({//응답값 user
      user,
    });
  })


module.exports = router;
module.exports = { signUp }


