const express = require('express'); //express의 패키지를 가져오는 코드
const app = express();// express를 app이라는 변수에 넣어서 함수처럼 사용
const port = 3000;     //3001번 포트로 열어 로컬환경에서 서버를 켜주는 코드
const userRouter = require("./routes/user")//router폴더 안에 있는 기능을 서버로 가져와서 postRouter변수에 넣어
const productRouter = require("./routes/product")//router폴더 안에 있는 기능을 서버로 가져와서 postRouter변수에 넣어
const reviewRouter = require("./routes/review")
const cartRouter = require("./routes/cart")

//테스트


const requestMiddleware = (req, res, next) => {
    // console.log("request Url : ", req.originalUrl, "-", new Date());
    next();
};

//app.use : 미들웨어를 사용할 때 쓰는 코드
app.use(express.static("static"));
app.use(requestMiddleware);
app.use(express.json());
app.use("/api", [userRouter, productRouter, reviewRouter, cartRouter]);


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/static/index.html");
// });



// app.get('/', (req, res) => {
//     res.send('Hi')
//     //send메소드는 Ajax요청을 서버로 전달한다.
//     //send();        GET 방식
//     //send(문자열);  POST 방식
// })

app.listen(port, () => {
    console.log(port, "서버가 연결되었습니다.")
})


