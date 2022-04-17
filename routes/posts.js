// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const {market_kurlynew} = require('../models');
const express = require("express");
const { User } = require("../models");
// const { productNew } = require("../models/productnew")
const router = express.Router();
const jwt = require('jsonwebtoken')
// const authMiddleware = require("../middleswares/auth-middleware")

router.get("/", (req, res) => {
    console.log("미들웨어가 작동합니다.")
    res.send('list page')
});


//회원가입
router.post("/signUp", async (req, res) => {
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
})


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







router.post("/product/new", async (req, res) => {
    // 브라우저를 실행한다.
    // 옵션으로 headless모드를 끌 수 있다.
    const { index, title, price, discount, kurlyOnly, imgurl, originals, desc } = req.body;
    const browser = await puppeteer.launch({
      headless: false
    });
  
    // 새로운 페이지를 연다.
    const page = await browser.newPage();
    // 페이지의 크기를 설정한다.
    await page.setViewport({
      width: 1366,
      height: 768
    });
  
    await page.goto('https://www.kurly.com/shop/goods/goods_list.php?category=038');
  
  
    // 페이지의 HTML을 가져온다.
    const content = await page.content();
    // $에 cheerio를 로드한다.
    const $ = cheerio.load(content);
    // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
    const lists = $("#goodsList > div.list_goods > div > ul > li");
    // 모든 리스트를 순환한다.
  
    
    
    lists.each(async (index, list) => {
      const title = $(list).find("div > a > span.name").text().trim();
      const imgurl = $(list).find("div > div > a > img").attr("src");
      const price = $(list).find("div > a > span.cost > span.price").text().replace(/[^0-9]/g,'');
      const discount = $(list).find("div > a > span.cost > span.dc").text().replace(/[^0-9]/g,'');
      const originals = $(list).find("div > a > span.cost > span.original").text().replace(/[^0-9]/g,'');
      const desc = $(list).find("div > a > span.desc").text();
      const kurlyOnly =  $(list).find("div > a > span.tag > span").text();
      // create(title, imgurl, price, discount, originals, desc, kurlyOnly);
      
      await market_kurlynew.create({title:title)
      console.log({index, title, price, discount, kurlyOnly, imgurl, originals, desc});
      
      
    });
    // function create(title, imgurl, price, discount, originals, desc, kurlyOnly) {
    //   market_kurlynew.create({title: title, price: price, discount: discount, kurlyOnly: kurlyOnly, imgurl: imgurl, originals: originals, desc: desc})
    // }
  
    // 브라우저를 종료한다.
    browser.close();
  })();


// //list목록 조회
// router.get("/post", async (req, res) => {
//     const post = await Post.find();//Post안에 모든 값을 찾아와 변수 post에 넣어준다
//     res.json({ post });//json 형태로 post의 값을 받아온다
// });


// //write.html 게시글 작성
// router.post("/post/write", async (req, res) => {
//     const today = new Date(); // new Date 현재 시간
//     const date = today.toLocaleString();//현재 시간을 문자열로 바꿔  변수date에 넣어준다 //toLocaleString
//     const { title, writer, description, pw } = req.body; //작성된 바디의 값들을
//     // console.log(req.body)

//     const createdPosts = await Post.create({ writer,  title, description, pw, date, });//Post라는 컬렉션에 create만들어준다.
//     res.json({ post: createdPosts });//json이라는 형태로 변수createdPosts를 post에 넣어서 받아온다
// });


// // Id값 가져와서 상세조회하기
// router.get("/post/:postid", async (req, res) => {
//     const { postid } = req.params;//user주소 뒤에 파라미터값을 변수 postid에 넣어준다
//     const [ view ] = await Post.find({ _id: postid }).exec();//Post컬렉션 안에 _id 값을 찾아와 view배열 안에 넣어준다
//     console.log(view)
//     const comment  = await Comment.find({})//Comment컬렉션의 모든 값을 찾아와 변수 comment에 넣어주고
//     res.json({//json형태로 찾아와 프론트에서 사용할 수 있게 보내준다.
//         view,
//         comment,
//     });
// });


// //회원 조회
// router.get("/postlogin/:postid", authMiddleware, async (req, res) => {
//     const { postid } = req.params;
//     const userId = res.locals.user._id;//locals.user안에 저장되있는_id의 값을 변수 userId에 넣어준다
//     const [ view ] = await Post.find({ _id: postid }).exec();
//     const comment  = await Comment.find({})
    
//     res.json({
//         view,
//         comment,
//         userId
//     });
// });


// //comment 작성 POST
// router.post("/posts/:postid", authMiddleware, async (req, res) => {
//     const { postid } = req.params;
//     const userId = res.locals.user._id;
//     const nickname = res.locals.user.nickname // locals.user안에 nickname을 찾아오 변수 nickname에 넣어준다
//     // console.log(nickname)
//     const { comment } = req.body;//body에 작성된 값을 변수comment에 저장해주고
//     if(!comment.length) {//만약 comment에 작성된 값이 없으면 '댓글 내용을 입력해주세요'라는 error메세지르 띄워준다
//         res.status(400).send({
//             errorMessage: '댓글 내용을 입력해주세요.'
//         })
//         return;
//     }
    
//     await Comment.create({ comment, postid , userId, nickname })//제대로 작성이 됐으면 앞에 적힌 정보를 Comment안에 컬렉션에 저장해준다
//     res.json({ msg: '등록완료' })
// })


// // comment 삭제 DELETE
// router.delete("/postss/:postid", async (req, res) => {
//     const { id } = req.body;
//     // console.log(id)
//     const comment = await Comment.findById({_id: id}).exec();
//     // console.log(comment)
//     await Comment.deleteOne({_id: id});
//     res.send({})

// }); 


// //comment 수정 patch
// router.patch("/posts/:commentid", (req, res) => {

// });






module.exports = router;


