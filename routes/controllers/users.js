const { User } = require("../../models");
const jwt = require('jsonwebtoken')



//회원가입
const signUp = async (req, res) => {
    const { userId, password, passwordCheck, userName, address } = req.body;
    if (password !== passwordCheck) {
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.'
        });
        return;
    }


    const existUsers = await User.findAll({
        where: { userId }
    });
    if (existUsers.length) {
        res.status(400).send({
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.'
        });
        return;
    }
    await User.create({ userId, password, userName, address });

    res.status(201).send({})
}


//로그인
const login = async (req, res) => {
    const { userId, password } = req.body;
    const user = await User.findOne({ where: { userId, password } });

    if (!user) {
        res.status(400).send({
            errorMessage: '닉네임 또는 패스워드를 확인해주세요.'
        })
        return;
    }
    const token = jwt.sign({ userId: user.uniqueUserid }, "m-s-k-j-w");
    res.send({
        token,
    })
};


const user = async (req, res) => {
    const { user } = res.locals;
    res.send({
        user,
    });
}



module.exports = { signUp, login, user }


